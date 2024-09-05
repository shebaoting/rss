import Model from 'flarum/common/Model';

export default class RssFeed extends Model {
  id = Model.attribute('id'); // 确保 id 属性正确解析
  title = Model.attribute('title');
  url = Model.attribute('url');
  status = Model.attribute('status');
  userId = Model.attribute('user_id');
  createdAt = Model.attribute('created_at');
}
