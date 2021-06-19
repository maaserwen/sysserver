var express = require('express');
var router = express.Router();
var model = require('./db');

/* GET users listing. */
router.post('/add', function(req, res, next) {
  model.Class.findOne({classname: req.body.classname}, function(err, klass) {
    if (err) {
      console.log(err);
    }
    if (klass) {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '课程已存在，请勿重复！'
      })
    } else {
      let newClass = new model.Class({
        classname: req.body.classname,
        owner: req.body.owner,
        limit: req.body.limit
      })
      newClass.save(function(err, newUser) {
        if (err) {
          console.log(err)
        }
        res.json({
          code: 1,
          status: 'SUCCESS',
          message: '添加成功',
          data: {
            class: {
              classname: newClass.classname,
            }
          }
        })
      })
    }
  })
})

router.get('/query', function(req, res, next) {
  model.Class.find({}).populate('owner').populate('students.user').exec(function(err, classes) {
    if (err) {
      console.log(err);
    }
    if (classes) {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: {
          classes: classes.map(el => ({
            classname: el.classname,
            id: el._id,
            owner: el.owner.username,
            students: el.students.map(el => el.user ? el.user.username : ''),
            limit: el.limit
          }))
        }
      })
    } else {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '暂无课程，请添加课程！'
      })
    }
  })
})

router.get('/queryByUser', function(req, res, next) {
  model.Class.find({students:{$elemMatch:{user: req.query.id}}}).populate('owner').populate('students.user').exec(function(err, classes) {
    if (err) {
      console.log(err);
    }
    if (classes) {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: {
          classes: classes.map(el => ({
            classname: el.classname,
            id: el._id,
            owner: el.owner.username,
            students: el.students.map(el => el.user ? el.user.username : ''),
            limit: el.limit
          }))
        }
      })
    } else {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '暂无课程，请添加课程！'
      })
    }
  })
})

router.get('/queryScore', function(req, res, next) {
  model.Class.find({students:{$elemMatch:{user: req.query.id}}}).populate('owner').populate('students.user').exec(function(err, classes) {
    if (err) {
      console.log(err);
    }
    if (classes) {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: {
          classes: classes.map(el => ({
            classname: el.classname,
            id: el._id,
            owner: el.owner.username,
            score: el.students.find(student => student.user.id == req.query.id).score,
          }))
        }
      })
    } else {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '暂无课程，请添加课程！'
      })
    }
  })
})

router.get('/queryByOwner', function(req, res, next) {
  model.Class.find({owner: req.query.id}).populate('owner').populate('students.user').exec(function(err, classes) {
    if (err) {
      console.log(err);
    }
    if (classes) {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '查询成功',
        data: {
          classes: classes.map(el => ({
            classname: el.classname,
            id: el._id,
            owner: el.owner.username,
            students: el.students.map(el => ({
              id: el.user._id,
              score: el.score,
              username: el.user.username
            })),
            limit: el.limit
          }))
        }
      })
    } else {
      res.json({
        code: 0,
        status: 'FAIL',
        message: '暂无课程，请添加课程！'
      })
    }
  })
})

router.get('/delete', function(req, res, next) {
  model.Class.deleteOne({_id: req.query.id}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 1,
        status: 'SUCCESS',
        message: '删除成功！'
      })
    }
  })
})

router.post('/choose', function(req, res, next) {
  model.Class.findOne({_id: req.body.classId}, function(err, klass){
    if (err) {
      console.log(err);
    } else {
      if (klass.students.length >= klass.limit) {
        res.json({
          code: 0,
          status: 'FAIL',
          message: '选课失败，课程人数已满'
        })
      } else {
        model.Class.updateOne({_id: req.body.classId}, {
          $push: {
            students: {
              user: req.body.userId
            }
          }
        }, {
          new: true
        }).exec().then(data => {
          res.json({
            code: 1,
            status: 'SUCCESS',
            message: '选课成功！'
          })
        })
      }
    }
  })
})

router.post('/uploadScore', function(req, res, next) {
  model.Class.updateOne({_id: req.body.id}, {
    $set: {
      students: req.body.score
    }
  }, {
    new: true
  }).exec().then(data => {
    res.json({
      code: 1,
      status: 'SUCCESS',
      message: '成绩上传成功！'
    })
  }).catch(err => {
    res.json({
      code: 0,
      status: 'FAIL',
      message: '成绩上传失败！'
    })
  })
})

module.exports = router;
