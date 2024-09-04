import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import RssFeedPage from './components/RssFeedPage';

app.initializers.add('shebaoting/rss', () => {
  // 添加 RSS 导航链接
  extend(IndexPage.prototype, 'navItems', (items) => {
    items.add(
      'rss',
      m(
        'a',
        {
          href: app.route('rss.feed'), // 使用 Flarum 的路由系统
          onclick: (e) => {
            e.preventDefault(); // 阻止默认行为
            m.route.set(app.route('rss.feed')); // 使用 Mithril 跳转到 RSS 页面
          },
          className: 'hasIcon', // 为链接添加类名
        },
        [
          // 图标部分
          m('i', { className: 'icon fas fa-rss Button-icon', 'aria-hidden': 'true' }),
          // 文本部分
          m('span', { className: 'Button-label' }, '独立博客'),
        ]
      ),
      -10
    );
  });

  // 注册路由
  app.routes['rss.feed'] = {
    path: '/rss',
    component: RssFeedPage, // 使用 RSS 页面组件
  };

  console.log('[shebaoting/rss] RSS Aggregator link added to the navbar!');
});
