import Component from 'flarum/common/Component';

export default class RssFeedList extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.feeds = [];
    this.loadFeeds();
  }

  loadFeeds() {
    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/rss-items',
      })
      .then((feeds) => {
        this.feeds = feeds.data;
        m.redraw();
      });
  }

  view() {
    return (
      <div className="RssFeedList">
        <div className="DiscussionList">
          <ul class="DiscussionList-discussions">
            {this.feeds.map((feed) => (
              <li>
                <div class="DiscussionListItem">
                  <div className="DiscussionListItem-content Slidable-content read">
                    <a href={feed.attributes.link} target="_blank" className="DiscussionListItem-main">
                      <h2 class="DiscussionListItem-title">{feed.attributes.title}</h2>
                      <ul class="DiscussionListItem-info">
                        <li class="item-tags">
                          <span class="TagsLabel">
                            <span class="TagLabel colored text-contrast--light TagLabel--child" style="--tag-bg: #6b7eb7;">
                              <span class="TagLabel-text">
                                <i class="TagLabel-icon icon fas iconfont icon-php"></i>
                                <span class="TagLabel-name">{feed.attributes.site_name}</span>
                              </span>
                            </span>
                          </span>
                        </li>

                        <li class="item-terminalPost">
                          <span>
                            发布于 <time>{feed.attributes.published_at}</time>
                          </span>
                        </li>
                      </ul>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
