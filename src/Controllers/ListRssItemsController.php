<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Shebaoting\Rss\Serializers\RssItemSerializer;
use Shebaoting\Rss\Models\RssItem;

class ListRssItemsController extends AbstractListController
{
    public $serializer = RssItemSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // 仅获取状态为 'approved' 的站点的文章
        return RssItem::whereHas('feed', function ($query) {
            $query->where('status', 'approved');
        })->with('feed')->orderBy('published_at', 'desc')->get();
    }
}
