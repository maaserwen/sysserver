var express = require('express');
var router = express.Router();
var model = require('./db');

/* GET users listing. */
router.get('/teachers', function(req, res, next) {
  model.User.find({role: '2'}, function(err, teachers) {
    if (err) {
      console.log(err);
    }
    if (teachers) {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: {
          teachers: teachers.map(el => ({
            name: el.username,
            id: el._id
          }))
        }
      })
    } else {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '暂无老师，请添加老师账号！'
      })
    }
  })
})

module.exports = router;
