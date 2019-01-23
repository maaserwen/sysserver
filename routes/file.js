var express = require('express');
var router = express.Router();
const path = require('path');
var multiparty = require('multiparty');

router.post('/upload', function(req, res, next) {
  let form = new multiparty.Form({uploadDir: './upload/'});

  form.parse(req, function(err, fields, files){
    if (err) console.error(err);
    res.json({
      code: 1,
      status: 'SUCCESS',
      message: '上传成功',
      data: global.fileUrl + files.file[0].path
    })
  })
})

module.exports = router;
