import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class RssSubmitModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.url = ''; // 使用 url 代替 link
    this.siteTitle = ''; // 使用 siteTitle 代替 title
  }

  className() {
    return 'RssSubmitModal Modal--small';
  }

  title() {
    return '提交 RSS 站点';
  }

  content() {
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

  onsubmit(e) {
    e.preventDefault();
    this.loading = true;

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/rss-feeds',
        body: {
          url: this.url, // 提交 URL 而不是 link
          title: this.siteTitle,
        },
      })
      .then(() => {
        this.loading = false;
        app.alerts.show({ type: 'success' }, 'RSS 站点已成功提交！');
        this.hide();
        m.redraw();
      })
      .catch(() => {
        this.loading = false;
        app.alerts.show({ type: 'error' }, '提交失败，请重试。');
        m.redraw();
      });
  }
}
