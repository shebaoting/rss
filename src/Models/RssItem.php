<?php

namespace Shebaoting\Rss\Models;

use Flarum\Database\AbstractModel;

class RssItem extends AbstractModel
{
    protected $table = 'rss_items';
    protected $dates = ['published_at'];
    protected $fillable = ['rss_feed_id', 'title', 'content', 'link', 'published_at'];

    public function feed()
    {
        return $this->belongsTo(RssFeed::class, 'rss_feed_id');
    }
}
