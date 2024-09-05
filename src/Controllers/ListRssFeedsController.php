<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Shebaoting\Rss\Models\RssFeed;
use Shebaoting\Rss\Serializers\RssFeedSerializer;

class ListRssFeedsController extends AbstractListController
{
    public $serializer = RssFeedSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return RssFeed::all(); // 获取所有RSS Feeds
    }
}
