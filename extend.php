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
use Illuminate\Console\Scheduling\Schedule;
use Shebaoting\Rss\Controllers\ListRssItemsController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/rss', 'rss.feed', function (Document $document, $request) {
            $document->title = 'RSS Aggregator'; // 设置页面标题
        }),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Console())
        ->command(\Shebaoting\Rss\Console\FetchRssFeeds::class),
    (new Extend\Routes('api'))
        ->get('/rss-items', 'rss.items.index', ListRssItemsController::class)
        ->post('/rss-feeds', 'rss.feeds.create', \Shebaoting\Rss\Controllers\CreateRssFeedController::class),
];
