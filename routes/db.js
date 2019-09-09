var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/myblog', { useNewUrlParser: true }, (err, res) => {
  if(err) {
    console.log(err);
  }
});

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
  username: String,
  password: String,
  mail: String,
  photoPath: String,
  isAdmin: Boolean
})

var Models = {
  Blog: mongoose.model('Blog', blogSchema),
  Classification: mongoose.model('Classification', classificationSchema),
  User: mongoose.model('User', userSchema)
}

module.exports = Models;