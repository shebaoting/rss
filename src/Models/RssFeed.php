<?php

namespace Shebaoting\Rss\Models;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

class RssFeed extends AbstractModel
{
    protected $table = 'rss_feeds';

    protected $fillable = ['url', 'title', 'user_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
