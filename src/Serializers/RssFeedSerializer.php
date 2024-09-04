<?php

namespace Shebaoting\Rss\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class RssFeedSerializer extends AbstractSerializer
{
    protected $type = 'rss-feeds';

    protected function getDefaultAttributes($rssFeed)
    {
        return [
            'title' => $rssFeed->title,
        ];
    }
}
