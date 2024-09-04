import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import RssSubmitModal from './RssSubmitModal'; // 引入自定义 Modal

export default class RssToolbar extends Component {
  view() {
    return (
      <div className="IndexPage-toolbar rss-subsec">
        <ul className="IndexPage-toolbar-action">
          <li className="item-markAllAsRead">
            <Button
              className="Button hasIcon"
              onclick={() => app.modal.show(RssSubmitModal)} // 点击按钮时显示 Modal
            >
              提交站点
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
