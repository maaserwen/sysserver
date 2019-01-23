var express = require('express');
var router = express.Router();
var model = require('./db');

/* GET users listing. */
router.get('/getDetail', function(req, res, next) {
  res.json({
    code: 1,
    status: 'SUCCESS',
    message: 'lalala',
    data: {
      username: 'gouhoutai',
      password: '123456'
    }
  })
});

router.post('/saveData', function(req, res, next) {
  res.json({
    code: 1,
    status: 'SUCCESS',
    message: 'lalala',
    data: {}
  })
});

router.get('/getList', function(req, res, next) {
  res.json({
    code: 0,
    status: 'SUCCESS',
    message: '出错了',
    data: [{
      username: '一号用户',
      password: '123456'
    }, {
      username: '二号用户',
      password: '223456'
    }, {
      username: '三号用户',
      password: '323456'
    }]
  })
})

module.exports = router;
