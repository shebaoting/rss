import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import listItems from 'flarum/common/helpers/listItems';
import IndexPage from 'flarum/forum/components/IndexPage';
import RssFeedList from './RssFeedList';

export default class RssFeedPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    app.setTitle('RSS Aggregator'); // 设置页面标题
  }

  view() {
    return (
      <div className="IndexPage">
        {IndexPage.prototype.hero()} {/* 复用 IndexPage 的头部样式 */}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul> {/* 保留侧边栏 */}
            </nav>
            <div className="RssFeedListContent IndexPage-results sideNavOffset">
              <RssFeedList /> {/* 显示 RSS 列表 */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
