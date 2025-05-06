<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Shebaoting\Rss\Models\RssFeed;
use Shebaoting\Rss\Serializers\RssFeedSerializer;

class CreateRssFeedController extends AbstractCreateController
{
    public $serializer = RssFeedSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        app('log')->info('Request Body: ' . json_encode($request->getParsedBody()));

        // 获取当前登录用户
        $actor = $request->getAttribute('actor');
        $actor->assertCan('create', RssFeed::class);  // 确保用户有权限提交 RSS

        // 获取请求体中的 URL 和站点名称
        $url = Arr::get($request->getParsedBody(), 'data.attributes.url');
        $title = Arr::get($request->getParsedBody(), 'data.attributes.title');

        // 创建 RSS Feed，并保存用户 ID
        $feed = RssFeed::create([
            'url' => $url,  // 保存 URL
            'title' => $title,  // 保存站点名称
            'user_id' => $actor->id,  // 保存当前登录用户的 ID
            'status' => 'pending'
        ]);

        return $feed;
    }
}
