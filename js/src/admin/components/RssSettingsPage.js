import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import withAttr from 'flarum/common/utils/withAttr';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import app from 'flarum/admin/app';

export default class RssSettingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.loadingFeeds = true; // 加载状态

    app.store.find('rss-feeds').then((feeds) => {
      this.loadingFeeds = false;
      m.redraw();
    });
  }

  content() {
    const rssFeeds = app.store.all('rss-feeds'); // 获取所有 RSS 站点

    return (
      <div className="container RssFeed-container">
        <h2>{app.translator.trans('shebaoting-rss.admin.page.title')}</h2>

        {this.loadingFeeds ? (
          <LoadingIndicator />
        ) : (
          <table className="Table RssFeedTable">
            {' '}
            {/* 添加自定义类 RssFeedTable */}
            <thead>
              <tr>
                <th>{app.translator.trans('shebaoting-rss.admin.page.heading.title')}</th>
                <th>{app.translator.trans('shebaoting-rss.admin.page.heading.url')}</th>
                <th>{app.translator.trans('shebaoting-rss.admin.page.heading.status')}</th>
                <th>{app.translator.trans('shebaoting-rss.admin.page.heading.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {rssFeeds.map((feed) => (
                <tr key={feed.id()}>
                  <td>
                    <input
                      className="FormControl"
                      type="text"
                      value={feed.title()}
                      oninput={withAttr('value', (value) => this.updateFeed(feed, 'title', value))}
                    />
                  </td>
                  <td>
                    <input
                      className="FormControl"
                      type="text"
                      value={feed.url()}
                      oninput={withAttr('value', (value) => this.updateFeed(feed, 'url', value))}
                    />
                  </td>
                  <td class="status">
                    {Switch.component({
                      state: feed.status() === 'approved',
                      onchange: () => this.toggleApproval(feed),
                    })}
                  </td>
                  <td>
                    {Button.component(
                      {
                        className: 'Button Button--danger',
                        icon: 'fas fa-trash',
                        onclick: () => this.deleteFeed(feed),
                      },
                      app.translator.trans('shebaoting-rss.admin.page.delete')
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  toggleApproval(feed) {
    const newStatus = feed.status() === 'approved' ? 'pending' : 'approved';
    feed.save({ status: newStatus });
  }

  updateFeed(feed, attribute, value) {
    feed
      .save({ [attribute]: value }, { method: 'PATCH' }) // 使用 PATCH 请求来更新
      .then(() => {
        console.log('Feed updated successfully');
      })
      .catch((error) => {
        console.error('Error updating feed:', error);
      });
  }

  deleteFeed(feed) {
    feed.delete({ method: 'DELETE' }).then(() => m.redraw()); // 使用 DELETE 方法
  }
}
