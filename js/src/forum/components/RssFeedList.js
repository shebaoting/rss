import app from 'flarum/forum/app';
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
        url: app.forum.attribute('apiUrl') + '/rss-items', // 调用后端获取 RSS 内容
      })
      .then((feeds) => {
        this.feeds = feeds.data;
        m.redraw();
      });
  }

  view() {
    return (
      <div className="RssFeedList">
        {this.feeds.map((feed) => (
          <div className="RssFeed-item">
            <a href={feed.attributes.link} target="_blank">
              {feed.attributes.title}
            </a>
            <p>{feed.attributes.content}</p>
          </div>
        ))}
      </div>
    );
  }
}
