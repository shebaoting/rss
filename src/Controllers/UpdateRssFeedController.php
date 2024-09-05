<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Shebaoting\Rss\Models\RssFeed;
use Illuminate\Support\Arr;
use Shebaoting\Rss\Serializers\RssFeedSerializer;

class UpdateRssFeedController extends AbstractShowController
{
    public $serializer = RssFeedSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        app('log')->info('Entered UpdateRssFeedController for update operation');

        // 获取 Feed ID 并打印日志
        $feedId = Arr::get($request->getQueryParams(), 'id');
        app('log')->info('Updating Feed ID: ' . $feedId);

        // 查找该 Feed
        $feed = RssFeed::findOrFail($feedId);
        app('log')->info('Current Feed Data: ' . json_encode($feed->toArray()));

        // 获取传入的更新数据
        $attributes = Arr::only($request->getParsedBody(), ['title', 'url', 'status']);
        app('log')->info('Attributes to update: ' . json_encode($attributes));

        // 更新并记录每个字段的变更
        if (isset($attributes['title'])) {
            $feed->title = $attributes['title'];
            app('log')->info('Updated title to: ' . $attributes['title']);
        }

        if (isset($attributes['url'])) {
            $feed->url = $attributes['url'];
            app('log')->info('Updated url to: ' . $attributes['url']);
        }

        if (isset($attributes['status'])) {
            $feed->status = $attributes['status'];
            app('log')->info('Updated status to: ' . $attributes['status']);
        }

        // 保存 Feed 并记录保存操作
        if ($feed->save()) {
            app('log')->info('Feed saved successfully with updated data');
        } else {
            app('log')->error('Failed to save the Feed');
        }

        return $feed;
    }
}
