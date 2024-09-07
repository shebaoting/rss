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
use Shebaoting\Rss\Controllers\CreateRssFeedController;
use Shebaoting\Rss\Controllers\ListRssFeedsController;
use Shebaoting\Rss\Controllers\UpdateRssFeedController;
use Shebaoting\Rss\Controllers\DeleteRssFeedController;
use Shebaoting\Rss\Controllers\ListUserRssFeedsController;

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
        ->get('/user-rss-feeds', 'rss.userfeeds.index', ListUserRssFeedsController::class) // 新增此行
        ->get('/rss-items', 'rss.items.index', ListRssItemsController::class)
        ->post('/rss-feeds', 'rss.feeds.create', CreateRssFeedController::class)
        ->get('/rss-feeds', 'rssfeeds.index', ListRssFeedsController::class)
        // 添加处理单个 RSS Feed 的路由
        ->patch('/rss-feeds/{id}', 'rss.feeds.update', UpdateRssFeedController::class)
        ->delete('/rss-feeds/{id}', 'rss.feeds.delete', DeleteRssFeedController::class),
];
