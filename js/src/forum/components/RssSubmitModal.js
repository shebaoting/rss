import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';

export default class RssSubmitModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.url = ''; // 使用 url 代替 link
    this.siteTitle = ''; // 使用 siteTitle 代替 title
    this.feedId = null; // 用于记录当前 Feed 的 ID
    this.loading = true; // 标记加载状态

    console.log('[RssSubmitModal] Modal initialized, starting to load existing feed.');

    // 加载当前用户的 RSS Feed 信息
    this.loadExistingFeed();
  }

  loadExistingFeed() {
    console.log('[RssSubmitModal] Sending request to load current user feed.');

    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/user-rss-feeds', // 请求新的 API 端点
      })
      .then((response) => {
        if (response.data.length > 0) {
          const userFeed = response.data[0]; // 使用当前用户的第一个 RSS Feed
          this.feedId = userFeed.id;
          this.url = userFeed.attributes.url;
          this.siteTitle = userFeed.attributes.title;
          console.log('[RssSubmitModal] Found user feed:', userFeed);
        } else {
          console.log('[RssSubmitModal] No existing feed found for the user.');
        }

        this.loading = false; // 加载完成
        m.redraw(); // 强制 Mithril 重新渲染组件
      })
      .catch((error) => {
        console.error('[RssSubmitModal] Error loading existing feed:', error);
        this.loading = false;
        m.redraw();
      });
  }

  className() {
    return 'RssSubmitModal Modal--small';
  }

  title() {
    return '提交 RSS 站点';
  }

  content() {
    // 如果数据仍在加载中，显示加载状态
    if (this.loading) {
      console.log('[RssSubmitModal] Loading feed data, showing loading state.');
      return (
        <div className="Modal-body">
          <p>加载中...</p>
        </div>
      );
    }

    console.log('[RssSubmitModal] Feed data loaded, rendering form with URL:', this.url, 'and siteTitle:', this.siteTitle);

    // 数据加载完成后显示表单
    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>站点名称</label>
          <input
            className="FormControl"
            placeholder="请输入站点名称"
            value={this.siteTitle}
            oninput={(e) => {
              this.siteTitle = e.target.value; // 捕获站点名称
              console.log('[RssSubmitModal] Updated siteTitle:', this.siteTitle);
            }}
          />
        </div>
        <div className="Form-group">
          <label>RSS 链接</label>
          <input
            className="FormControl"
            placeholder="请输入 RSS 链接"
            value={this.url} // 使用 url 代替 link
            oninput={(e) => {
              this.url = e.target.value; // 捕获 RSS 链接
              console.log('[RssSubmitModal] Updated URL:', this.url);
            }}
          />
        </div>
        <div className="Form-group">
          <Button className="Button Button--primary" onclick={this.onsubmit.bind(this)} loading={this.loading}>
            提交
          </Button>
        </div>
      </div>
    );
  }

  // 提交表单
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    console.log('[RssSubmitModal] Submitting form with URL:', this.url, 'and siteTitle:', this.siteTitle);

    // 检查是否为空
    if (!this.url || !this.siteTitle) {
      app.alerts.show({ type: 'error' }, 'RSS 链接和站点名称不能为空');
      this.loading = false;
      return;
    }

    const method = this.feedId ? 'PATCH' : 'POST'; // 如果有 feedId，则更新，否则创建
    const apiUrl = this.feedId ? app.forum.attribute('apiUrl') + `/rss-feeds/${this.feedId}` : app.forum.attribute('apiUrl') + '/rss-feeds';

    console.log('[RssSubmitModal] API method:', method, 'API URL:', apiUrl);

    app
      .request({
        method: method,
        url: apiUrl,
        body: {
          data: {
            attributes: {
              url: this.url, // 提交 URL
              title: this.siteTitle,
            },
          },
        },
      })
      .then(() => {
        this.loading = false;
        console.log('[RssSubmitModal] Form submitted successfully.');
        app.alerts.show({ type: 'success' }, 'RSS 站点已成功提交！');
        this.hide();
        m.redraw();
      })
      .catch((error) => {
        this.loading = false;
        console.error('[RssSubmitModal] Error submitting form:', error);
        app.alerts.show({ type: 'error' }, '提交失败，请重试。');
        m.redraw();
      });
  }
}
