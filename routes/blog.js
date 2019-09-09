var express = require('express');
var router = express.Router();
var model = require('./db');
const weekday = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]

//  保存博客
//  save blog
router.post('/saveBlog', function(req, res, next) {
  model.Blog.findOne({title: req.body.title}, function(err, blog) {
    if (err) console.error(err);
    if (blog) {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '文章已存在，请重命名标题！'
      })
    }else {
      let newBlog = new model.Blog({
        title: req.body.title,
        time: function(){
          let _date = new Date();
          return `${_date.getFullYear()}年 ${_date.getMonth()+1}月${_date.getDate()}日 ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()} ${weekday[_date.getDay()]}`
        }(),
        content: req.body.content,
        des: req.body.des
      })
      newBlog.save(function(err, newBlog) {
        if (err) console.error(err);
        res.json({
          code: 1,
          status: 'SUCCESS',
          message: '保存成功'
        })
      })
    }
  })
})

//  获取博客列表
//  get blog list
router.post('/getBlogList', function(req, res, next){
  model.Blog.find({}, function(err, blogs){
    if (err) console.error(err);
    if (blogs) {
      let result = blogs.map(el => {
        return {
          id: el._id,
          title: el.title,
          time: el.time,
          des: el.des
        }
      })
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: result
      })
    }
  })
})

module.exports = router;
