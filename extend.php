<?php

/*
 * This file is part of shebaoting/rss.
 *
 * Copyright (c) 2024 Shebaoting.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Shebaoting\Rss;

use Flarum\Extend;
use Flarum\Frontend\Document;
use Illuminate\Console\Scheduling\Event;
use Shebaoting\Rss\Api\Resource\RssFeedResource;
use Shebaoting\Rss\Api\Resource\RssItemResource;
use Shebaoting\Rss\Controllers\ListUserRssFeedsController;
use Shebaoting\Rss\Console\FetchRssFeeds;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/rss', 'rss.feed', function (Document $document, $request) {
            $document->title = 'RSS Aggregator';
        })
        ->route('/rss/item/{id}', 'rss.item', function (Document $document, $request) {
            $document->title = 'RSS Article';
        }),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    new Extend\ApiResource(RssFeedResource::class),
    new Extend\ApiResource(RssItemResource::class),

    (new Extend\Settings())
        ->default('shebaoting-rss.show_on_index', false)
        ->default('shebaoting-rss.materialized_tag_id', '')
        ->serializeToForum('shebaoting-rss.show_on_index', 'shebaoting-rss.show_on_index', 'boolval')
        ->serializeToForum('shebaoting-rss.materialized_tag_id', 'shebaoting-rss.materialized_tag_id'),

    (new Extend\User())
        ->registerPreference('shebaotingRssShowOnIndex', 'boolval', true),

    (new Extend\Console())
        ->command(FetchRssFeeds::class)
        ->schedule('rss:fetch', function (Event $event) {
            $event->hourly();
        }),

    (new Extend\Routes('api'))
        ->get('/user-rss-feeds', 'rss.userfeeds.index', ListUserRssFeedsController::class),
];
