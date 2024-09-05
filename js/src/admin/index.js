import app from 'flarum/admin/app';
import RssFeed from './models/RssFeed'; // 导入 RSS Feed 模型
import RssSettingsPage from './components/RssSettingsPage'; // 导入设置页面组件

app.initializers.add('shebaoting-rss', () => {
  // 使用 'rss-feeds' 来注册模型
  app.store.models['rss-feeds'] = RssFeed;

  app.extensionData.for('shebaoting-rss').registerPage(RssSettingsPage); // 注册设置页面
});
