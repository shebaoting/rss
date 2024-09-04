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
        return RssItem::with('feed')
            ->orderBy('published_at', 'desc')
            ->get();
    }
}
