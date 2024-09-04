<?php

namespace Shebaoting\Rss\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;
use Carbon\Carbon;

class RssItemSerializer extends AbstractSerializer
{
    protected $type = 'rss-items';

    /**
     * Get the default attributes for the serialized model.
     *
     * @param $rssItem
     * @return array
     */
    protected function getDefaultAttributes($rssItem)
    {
        return [
            'title' => $rssItem->title,
            // 'content' => $rssItem->content,
            'link' => $rssItem->link,
            'published_at' => Carbon::parse($rssItem->published_at)->format('Y-m-d H:i:s'),
            // 站点名称
            'site_name' => $rssItem->feed->title,
            // feed关联
            'feed' => $this->feed($rssItem),

        ];
    }

    /**
     * 添加feed关联
     *
     * @param $rssItem
     * @return Relationship
     */
    public function feed($rssItem)
    {
        return $this->hasOne($rssItem, RssFeedSerializer::class);
    }
}
