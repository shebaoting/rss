import Extend from 'flarum/common/extenders';
import RssFeedPage from './components/RssFeedPage';
import RssItemPage from './components/RssItemPage';

export default [
  new Extend.Routes().add('rss.feed', '/rss', RssFeedPage),
  new Extend.Routes().add('rss.item', '/rss/item/:id', RssItemPage),
];
