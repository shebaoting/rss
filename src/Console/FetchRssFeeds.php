<?php

namespace Shebaoting\Rss\Console;

use FeedIo\FeedIo;
use FeedIo\Adapter\Http\Client as FeedIoHttpClient;
use Http\Adapter\Guzzle7\Client as GuzzleAdapter;
use GuzzleHttp\Client as GuzzleClient;
use Psr\Log\NullLogger;
use Illuminate\Console\Command;
use Shebaoting\Rss\Models\RssFeed;
use Shebaoting\Rss\Models\RssItem;

class FetchRssFeeds extends Command
{
    protected $signature = 'rss:fetch';
    protected $description = 'Fetch RSS/Atom feeds and store the content';

    public function handle()
    {
        $feeds = RssFeed::where('status', 'approved')->get(); // 假设 'approved' 是审核通过的状态

        // 创建 Guzzle 客户端
        $guzzle = new GuzzleClient();
        // 使用 php-http 的 Guzzle 适配器
        $guzzleAdapter = new GuzzleAdapter($guzzle);

        // 使用 FeedIo 提供的 HTTP 客户端适配器
        $client = new FeedIoHttpClient($guzzleAdapter);

        // 使用 NullLogger 或自定义日志记录器
        $logger = new NullLogger();

        // 创建 FeedIo 实例
        $feedIo = new FeedIo($client, $logger);

        foreach ($feeds as $feed) {
            try {
                // 从 URL 抓取并解析 RSS 或 Atom
                $result = $feedIo->read($feed->url);

                // 遍历解析的项目
                foreach ($result->getFeed() as $item) {
                    // 获取 `<content:encoded>` 标签内容
                    $content = $item->getValue('content:encoded') ?: $item->getContent(); // 优先获取 content:encoded，如果没有则尝试 getContent()

                    // 插入或更新到数据库
                    RssItem::updateOrCreate(
                        ['link' => $item->getLink()],
                        [
                            'rss_feed_id' => $feed->id,
                            'title' => $item->getTitle(),
                            'content' => $content ?: '', // 如果 content 为空，则设置为空字符串
                            'published_at' => $item->getLastModified(),
                        ]
                    );
                }
            } catch (\Exception $e) {
                // 处理错误，例如记录日志或通知管理员
                $this->error("Failed to fetch feed from: {$feed->url} - Error: {$e->getMessage()}");
            }
        }
    }
}
