<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Shebaoting\Rss\Models\RssFeed;
use Shebaoting\Rss\Serializers\RssFeedSerializer;

class ListUserRssFeedsController extends AbstractListController
{
    public $serializer = RssFeedSerializer::class; // 使用现有的 RssFeedSerializer

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // 获取当前登录的用户
        $actor = $request->getAttribute('actor');

        // 返回当前用户的 RSS Feed
        return RssFeed::where('user_id', $actor->id)->get();
    }
}
