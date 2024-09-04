<?php

namespace Shebaoting\Rss\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class RssItemSerializer extends AbstractSerializer
{
    protected $type = 'rss-items';

    protected function getDefaultAttributes($rssItem)
    {
        return [
            'id'            => $rssItem->id,
            'title'         => $rssItem->title,
            'content'       => $rssItem->content,
            'link'          => $rssItem->link,
            'published_at'  => $rssItem->published_at ? $rssItem->published_at->toAtomString() : null,
        ];
    }
}
