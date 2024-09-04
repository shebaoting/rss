import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import RssFeedList from './components/RssFeedList';
app.initializers.add('shebaoting/rss', () => {
  extend(IndexPage.prototype, 'navItems', (items) => {
    items.add(
      'rss',
      m(
        'a',
        {
          href: '#',
          onclick: () => {
            app.rssMode = true; // 设置 RSS 模式
            app.current.get('route').refresh(); // 刷新当前路由
          },
        },
        'RSS Aggregator'
      ),
      -10
    );
  });

  extend(IndexPage.prototype, 'view', function (vnode) {
    if (app.rssMode) {
      vnode.children[1] = m(RssFeedList); // 替换帖子列表部分
    }
  });

  console.log('[shebaoting/rss] RSS Aggregator link added to the navbar!');
});
