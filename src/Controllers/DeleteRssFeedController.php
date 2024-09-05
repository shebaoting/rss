<?php

namespace Shebaoting\Rss\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Psr\Http\Message\ServerRequestInterface;
use Shebaoting\Rss\Models\RssFeed;
use Illuminate\Support\Arr;

class DeleteRssFeedController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $feedId = Arr::get($request->getQueryParams(), 'id');
        RssFeed::findOrFail($feedId)->delete();
    }
}
