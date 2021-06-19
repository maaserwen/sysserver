var mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/studentsystem', { useNewUrlParser: true }, (err, res) => {
  if(err) {
    console.log(err);
  }
});

var db = mongoose.connection;
db.on('error', (err) => console.log('err'));
db.once('open', () => console.log('success!'));

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  role: String
})

var classSchema = mongoose.Schema({
  classname: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  students: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    score: Number
  }],
  limit: Number
})

var Models = {
  User: mongoose.model('User', userSchema),
  Class: mongoose.model('Class', classSchema)
}

module.exports = Models;