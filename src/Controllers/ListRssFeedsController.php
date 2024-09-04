<?php

namespace Shebaoting\Rss\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Api\Controller\AbstractListController;
use Shebaoting\Rss\Models\RssFeed;
use Flarum\User\AssertPermissionTrait;

class ListRssFeedsController extends AbstractListController
{
    use AssertPermissionTrait;

    public $serializer = 'Shebaoting\Rss\Api\Serializer\RssFeedSerializer';

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $this->assertAdmin($actor);

        return RssFeed::all();
    }
}
