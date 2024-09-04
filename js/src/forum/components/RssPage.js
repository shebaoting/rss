import app from 'flarum/forum/app';
import Page from 'flarum/components/Page';

export default class RssPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.feeds = [];
    this.loadFeeds();
  }

  loadFeeds() {
    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/rss-items', // 新的 API 路由
      })
      .then((items) => {
        this.feeds = items;
        m.redraw();
      });
  }

  view() {
    return (
      <div className="RssPage">
        <div className="container">
          <div className="RssPage-list">
            {this.feeds.map((feed) => (
              <div className="RssPage-item">
                <a href={feed.url} target="_blank">
                  {feed.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
