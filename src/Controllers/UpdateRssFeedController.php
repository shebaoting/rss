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
        app('log')->info('Request Body: ' . json_encode($request->getParsedBody()));
        // 获取 Feed ID
        $feedId = Arr::get($request->getQueryParams(), 'id');

        // 查找该 Feed
        $feed = RssFeed::findOrFail($feedId);

        // 获取传入的更新数据
        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // 更新并记录每个字段的变更
        if (isset($attributes['title'])) {
            $feed->title = $attributes['title'];
        }

        if (isset($attributes['url'])) {
            $feed->url = $attributes['url'];
        }

        if (isset($attributes['status'])) {
            $feed->status = $attributes['status'];
        }

        // 保存 Feed
        $feed->save();

        return $feed;
    }
}
