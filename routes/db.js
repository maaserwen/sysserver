var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myblog');

var db = mongoose.connection;
db.on('error', (err) => console.log('err'));
db.once('open', () => console.log('success!'));

var blogSchema = mongoose.Schema({
  title : String,
  time : String,
  content : String,
  des: String,
  status: Number // 0 保存，1 发布
})

var classificationSchema = mongoose.Schema({
  pid: String,
  label: String
})

var userSchema = mongoose.Schema({
  userName: String,
  password: String
})

var Models = {
  Blog: mongoose.model('Blog', blogSchema),
  Classification: mongoose.model('Classification', classificationSchema),
  User: mongoose.model('User', userSchema)
}

Models.User.find({}, (err, users) => {
  if (err) console.log(err);
  if (!users.length) {
    let adminUser = new Models.User({
      userName: 'admin',
      password: 'wjnyjdc3'
    })
    adminUser.save((err, adminUser) => {
      if (err) console.log(err);
    })
  }
})

module.exports = Models;