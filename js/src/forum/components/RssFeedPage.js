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
              <div class="IndexPage-toolbar" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                <ul class="IndexPage-toolbar-view" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                  <li class="item-sort" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                    <div class="ButtonGroup Dropdown dropdown  itemCount6" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                      <button
                        class="Dropdown-toggle Button"
                        aria-haspopup="menu"
                        aria-label="更改「全部主题」排序"
                        data-toggle="dropdown"
                        data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                      >
                        <span class="Button-label" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                          最新回复
                        </span>
                        <i
                          aria-hidden="true"
                          class="icon fas fa-caret-down Button-caret"
                          data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                        ></i>
                      </button>
                      <ul class="Dropdown-menu dropdown-menu " data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                        <li class="">
                          <button class="hasIcon" type="button" active="">
                            <i aria-hidden="true" class="icon fas fa-check Button-icon"></i>
                            <span class="Button-label">最新回复</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">热门主题</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">新鲜出炉</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">陈年旧贴</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">最多翻阅</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">最少翻阅</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="item-solved-filter" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                    <div class="ButtonGroup Dropdown dropdown  itemCount3" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                      <button
                        class="Dropdown-toggle Button"
                        aria-haspopup="menu"
                        aria-label="已解决/未解决"
                        data-toggle="dropdown"
                        data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                      >
                        <span class="Button-label" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                          全部问题
                        </span>
                        <i
                          aria-hidden="true"
                          class="icon fas fa-caret-down Button-caret"
                          data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                        ></i>
                      </button>
                      <ul class="Dropdown-menu dropdown-menu " data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                        <li class="">
                          <button class="hasIcon" type="button" active="">
                            <i aria-hidden="true" class="icon fas fa-check Button-icon"></i>
                            <span class="Button-label">全部问题</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">已解决</span>
                          </button>
                        </li>
                        <li class="">
                          <button class="hasIcon" type="button">
                            <i aria-hidden="true" class="icon Button-icon"></i>
                            <span class="Button-label">等待解决</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <ul class="IndexPage-toolbar-action" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                  <li class="item-refresh" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                    <button
                      class="Button Button--icon hasIcon"
                      type="button"
                      aria-label="刷新"
                      data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                    >
                      <i
                        aria-hidden="true"
                        class="icon fas fa-sync Button-icon"
                        data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                      ></i>
                      <span class="Button-label" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"></span>
                    </button>
                  </li>
                  <li class="item-markAllAsRead" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f">
                    <button
                      class="Button Button--icon hasIcon"
                      type="button"
                      aria-label="全部已读"
                      data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                    >
                      <i
                        aria-hidden="true"
                        class="icon fas fa-check Button-icon"
                        data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"
                      ></i>
                      <span class="Button-label" data-immersive-translate-walked="996bfd72-70eb-417c-bb6b-a44c582ca53f"></span>
                    </button>
                  </li>
                </ul>
              </div>
              <RssFeedList /> {/* 显示 RSS 列表 */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
