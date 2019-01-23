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
  des: String
})

var classificationSchema = mongoose.Schema({
  pid: String,
  label: String
})

var Models = {
  Blog: mongoose.model('Blog', blogSchema),
  Classification: mongoose.model('Classification', classificationSchema)
}

module.exports = Models;