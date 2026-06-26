<?php

namespace Shebaoting\Rss\Api\Resource;

use Carbon\Carbon;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Bus\Dispatcher as BusDispatcher;
use Flarum\Discussion\Command\ReadDiscussion;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\ValidationException;
use Flarum\Post\CommentPost;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Shebaoting\Rss\Models\RssItem;
use Tobyz\JsonApiServer\Context;

/**
 * @extends AbstractDatabaseResource<RssItem>
 */
class RssItemResource extends AbstractDatabaseResource
{
    public function __construct(
        protected Dispatcher $events,
        protected BusDispatcher $bus,
        protected SettingsRepositoryInterface $settings
    ) {
    }

    public function type(): string
    {
        return 'rss-items';
    }

    public function model(): string
    {
        return RssItem::class;
    }

    public function scope(Builder $query, Context $context): void
    {
        $query
            ->whereHas('feed', fn (Builder $query) => $query->where('status', 'approved'))
            ->with(['feed', 'discussion'])
            ->orderByDesc('published_at');
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Show::make(),
            Endpoint\Index::make()
                ->paginate(20, 50),
            Endpoint\Endpoint::make('comment')
                ->route('POST', '/{id}/comments')
                ->authenticated()
                ->action(fn (FlarumContext $context): array => $this->comment($context)),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('title'),
            Schema\Str::make('link'),
            Schema\Str::make('contentPlain')
                ->visible(fn (RssItem $item, FlarumContext $context) => $context->showing(self::class))
                ->get(fn (RssItem $item) => $this->plainText($item->content ?? '', 2000)),
            Schema\Str::make('published_at')
                ->get(fn (RssItem $item) => $item->published_at?->format('Y-m-d H:i:s')),
            Schema\Integer::make('discussion_id'),
            Schema\Integer::make('comment_count')
                ->get(fn (RssItem $item) => $this->commentCount($item)),
            Schema\Str::make('site_name')
                ->get(fn (RssItem $item) => $item->feed?->title),
            Schema\Arr::make('feed')
                ->get(fn (RssItem $item) => $item->feed ? [
                    'id' => (string) $item->feed->id,
                    'title' => $item->feed->title,
                    'url' => $item->feed->url,
                ] : null),
        ];
    }

    private function comment(FlarumContext $context): array
    {
        $actor = $context->getActor();
        $actor->assertRegistered();

        /** @var RssItem $item */
        $item = $context->model;
        $content = trim((string) Arr::get($context->body(), 'data.attributes.content', ''));

        if ($content === '') {
            throw new ValidationException([
                'content' => app()->translator->trans('shebaoting-rss.forum.comment.validation_required'),
            ]);
        }

        if (mb_strlen($content) > 63000) {
            throw new ValidationException([
                'content' => app()->translator->trans('shebaoting-rss.forum.comment.validation_too_long'),
            ]);
        }

        $post = $item->getConnection()->transaction(function () use ($item, $actor, $content, $context) {
            /** @var RssItem $lockedItem */
            $lockedItem = RssItem::with(['feed.user', 'discussion'])
                ->whereKey($item->id)
                ->lockForUpdate()
                ->firstOrFail();

            $discussion = $lockedItem->discussion;

            if (! $discussion && $lockedItem->discussion_id) {
                $lockedItem->discussion_id = null;
                $lockedItem->save();
            }

            if (! $discussion) {
                $actor->assertCan('startDiscussion');
                $discussion = $this->createDiscussionForItem($lockedItem, $actor, $context);
            }

            $actor->assertCan('reply', $discussion);

            return $this->createUserComment($discussion, $actor, $content, $context);
        });

        return [
            'data' => [
                'type' => 'rss-item-comments',
                'id' => (string) $item->id,
                'attributes' => [
                    'discussion_id' => (int) $post->discussion_id,
                    'post_number' => (int) $post->number,
                ],
            ],
        ];
    }

    private function createDiscussionForItem(RssItem $item, $actor, FlarumContext $context): Discussion
    {
        $rssAuthor = $this->rssAuthor($item);

        $discussion = new Discussion();
        $discussion->title = $this->discussionTitle($item->title);
        $discussion->created_at = $item->published_at ?: Carbon::now();
        $discussion->user_id = $rssAuthor?->id;
        $discussion->setRelation('user', $rssAuthor);
        $this->setOriginalUrl($discussion, $item->link);
        $discussion->save();

        $articlePost = new CommentPost();
        $articlePost->discussion_id = $discussion->id;
        $articlePost->created_at = $item->published_at ?: Carbon::now();
        $articlePost->user_id = $rssAuthor?->id;
        $articlePost->ip_address = (string) $context->request->getAttribute('ipAddress', '');
        $articlePost->is_private = false;
        $articlePost->setRelation('discussion', $discussion);
        $articlePost->setRelation('user', $rssAuthor);
        $articlePost->setContentAttribute($this->articlePostContent($item), $actor);
        $articlePost->save();
        $articlePost->releaseEvents();

        $discussion->first_post_id = $articlePost->id;
        $discussion->refreshCommentCount();
        $discussion->refreshLastPost();
        $discussion->refreshParticipantCount();
        $discussion->save();
        $this->assignConfiguredTag($discussion);

        $item->discussion_id = $discussion->id;
        $item->save();
        $item->setRelation('discussion', $discussion);

        return $discussion;
    }

    private function rssAuthor(RssItem $item): ?User
    {
        $feed = $item->feed;

        if (! $feed) {
            return null;
        }

        return $feed->user ?: null;
    }

    private function createUserComment(Discussion $discussion, $actor, string $content, FlarumContext $context): CommentPost
    {
        $post = new CommentPost();
        $post->discussion_id = $discussion->id;
        $post->user_id = $actor->id;
        $post->created_at = Carbon::now();
        $post->ip_address = (string) $context->request->getAttribute('ipAddress', '');
        $post->is_private = false;
        $post->setRelation('discussion', $discussion);
        $post->setRelation('user', $actor);

        $this->events->dispatch(new PostSaving($post, $actor, [
            'attributes' => [
                'content' => $content,
            ],
            'relationships' => [
                'discussion' => [
                    'data' => [
                        'type' => 'discussions',
                        'id' => (string) $discussion->id,
                    ],
                ],
            ],
        ]));

        $post->setContentAttribute($content, $actor);
        $post->save();

        foreach ($post->releaseEvents() as $event) {
            if (property_exists($event, 'actor') && ! $event->actor) {
                $event->actor = $actor;
            }

            $this->events->dispatch($event);
        }

        $discussion
            ->refreshCommentCount()
            ->refreshLastPost()
            ->refreshParticipantCount()
            ->save();

        if ($actor->exists) {
            $this->bus->dispatch(new ReadDiscussion($discussion->id, $actor, $post->number));
        }

        return $post;
    }

    private function discussionTitle(?string $title): string
    {
        $title = trim(preg_replace('/\s+/u', ' ', (string) $title));

        if ($title === '') {
            $title = 'RSS Article';
        }

        if (mb_strlen($title) > 80) {
            $title = rtrim(mb_substr($title, 0, 77)).'...';
        }

        while (mb_strlen($title) < 3) {
            $title .= ' RSS';
        }

        return $title;
    }

    private function articlePostContent(RssItem $item): string
    {
        return trim((string) $item->link);
    }

    private function setOriginalUrl(Discussion $discussion, ?string $url): void
    {
        if (! $discussion->getConnection()->getSchemaBuilder()->hasColumn('discussions', 'original_url')) {
            return;
        }

        $discussion->original_url = mb_substr(trim((string) $url), 0, 255);
    }

    private function plainText(string $content, int $limit): string
    {
        $text = trim(html_entity_decode(strip_tags($content), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $text = preg_replace('/\s+/u', ' ', $text);

        return Str::limit($text, $limit);
    }

    private function commentCount(RssItem $item): int
    {
        $discussion = $item->discussion;

        if (! $discussion) {
            return 0;
        }

        return max(0, (int) $discussion->comment_count - 1);
    }

    private function assignConfiguredTag(Discussion $discussion): void
    {
        $tagId = (int) $this->settings->get('shebaoting-rss.materialized_tag_id');

        if ($tagId <= 0 || ! class_exists(Tag::class)) {
            return;
        }

        /** @var Tag|null $tag */
        $tag = Tag::query()->with('parent')->whereKey($tagId)->first();

        if (! $tag) {
            return;
        }

        $tags = $this->tagsWithAncestors($tag);
        $tagIds = $tags->filter()->pluck('id')->values()->all();

        if (! $tagIds) {
            return;
        }

        try {
            $discussion->tags()->sync($tagIds);
        } catch (\BadMethodCallException) {
            return;
        }

        $discussion->setRelation('tags', $tags->filter()->values());

        foreach ($tags->filter() as $tag) {
            if (! $discussion->is_private) {
                $tag->discussion_count = max(0, (int) $tag->discussion_count) + 1;
            }

            if ($discussion->last_posted_at && (! $tag->last_posted_at || $discussion->last_posted_at >= $tag->last_posted_at)) {
                $tag->setLastPostedDiscussion($discussion);
            }

            $tag->save();
        }
    }

    private function tagsWithAncestors(Tag $tag): EloquentCollection
    {
        $tags = [];
        $current = $tag;

        while ($current) {
            array_unshift($tags, $current);
            $current = $current->parent;
        }

        return (new EloquentCollection($tags))
            ->unique(fn (Tag $tag) => $tag->id)
            ->values();
    }
}
