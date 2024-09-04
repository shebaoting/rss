<?php

namespace Shebaoting\Rss\Console;

use Illuminate\Console\Command;
use Shebaoting\Rss\Models\RssFeed;
use Shebaoting\Rss\Models\RssItem;
use GuzzleHttp\Client;

class FetchRssFeeds extends Command
{
    protected $signature = 'rss:fetch';
    protected $description = 'Fetch RSS feeds and store the content';

    public function handle()
    {
        $feeds = RssFeed::where('status', 'approved')->get(); // 假设 'approved' 是审核通过的状态
        $client = new Client();

        foreach ($feeds as $feed) {
            $response = $client->get($feed->url);
            $rssContent = $response->getBody()->getContents();
            $parsedItems = $this->parseAtom($rssContent); // 解析 Atom 源内容

            foreach ($parsedItems as $item) {
                RssItem::updateOrCreate(
                    ['link' => $item['link']],
                    [
                        'rss_feed_id' => $feed->id,
                        'title' => $item['title'],
                        'content' => $item['content'],
                        'published_at' => $item['published_at']
                    ]
                );
            }
        }
    }

    protected function parseAtom($rssContent)
    {
        $items = [];
        $xml = simplexml_load_string($rssContent, 'SimpleXMLElement', LIBXML_NOCDATA);
        $namespaces = $xml->getNamespaces(true);

        foreach ($xml->entry as $entry) {
            $items[] = [
                'title' => (string) $entry->title,
                'link' => (string) $entry->link['href'],
                'content' => (string) $entry->content,
                'published_at' => new \DateTime($entry->published),
            ];
        }

        return $items;
    }
}
