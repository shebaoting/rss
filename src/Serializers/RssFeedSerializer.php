<?php

namespace Shebaoting\Rss\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class RssFeedSerializer extends AbstractSerializer
{
    protected $type = 'rss-feeds';

    protected function getDefaultAttributes($rssFeed)
    {
        return [
            'title' => $rssFeed->title,  // 返回站点名称
            'url' => $rssFeed->url,  // 返回 RSS 链接
            'user_id' => $rssFeed->user_id,  // 返回用户 ID
            'status' => $rssFeed->status,  // 审核状态
            'created_at' => $this->formatDate($rssFeed->created_at),  // 返回创建时间
        ];
    }
}
