var express = require('express');
var router = express.Router();
var model = require('./db');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

// token
function generateToken(data){
  let created = Math.floor(Date.now() / 1000);
  let token = jwt.sign({
      data,
      exp: created + 3600 * 24
  }, 'maaser');
  return token;
}

/* GET users listing. */
router.post('/signUp', function(req, res, next) {
  model.User.findOne({username: req.body.username, role: req.body.role}, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user) {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '用户名已存在，请修改用户名！'
      })
    } else {
      let newUser = new model.User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      })
      newUser.save(function(err, newUser) {
        if (err) {
          console.log(err)
        }
        res.json({
          code: 1,
          status: 'SUCCESS',
          message: '注册成功',
          data: {
            token: generateToken(JSON.stringify(newUser)),
            user: {
              username: newUser.username,
              id: newUser._id,
              role: req.body.role
            }
          }
        })
      })
    }
  })
})

router.post('/signIn', function(req, res, next) {
  model.User.findOne({username: req.body.username, role: req.body.role}, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '用户不存在，请确认用户信息重新登录！'
      })
    } else {
      if (req.body.password === md5(user.password)) {
        res.json({
          code: 1,
          status: 'SUCCESS',
          message: '登录成功',
          data: {
            token: generateToken(user),
            user: {
              username: user.username,
              id: user._id,
              role: req.body.role
            }
          }
        })
      } else {
        res.json({
          code: 0,
          status: 'FAIL',
          message: '用户信息错误，请确认用户信息重新登录！'
        })
      }
    }
  })
})

module.exports = router;
