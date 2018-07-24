var express = require('express');
var router = express.Router();

var fs = require("fs");
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  var todayStr = moment().format('YYYY-MM-DD');
  var uploadPath = './public/uploads/'+ todayStr;
  console.log("uploadPath="+uploadPath);
  fs.exists(uploadPath, function(exists) {
    if(exists) {
      console.log("目录已经创建。");
    }else{
      fs.mkdir(uploadPath,function(err){
        if (err) {
          return console.error("创建目录失败："+err);
        }
        console.log("目录创建成功。");
      });
    };
  });

  res.render('index', { title: 'Express' });

});
router.get('/strapi', function(req, res, next) {
  var todayStr = moment().format('YYYY-MM-DD');
  var uploadPath = './public/uploads/'+ todayStr;
  console.log("uploadPath="+uploadPath);
  fs.exists(uploadPath, function(exists) {
    if(exists) {
      console.log("目录已经创建。");
    }else{
      fs.mkdir(uploadPath,function(err){
        if (err) {
          return console.error("创建目录失败："+err);
        }
        console.log("目录创建成功。");
      });
    };
  });

  res.render('strapi', { title: 'strapi' });

});

module.exports = router;
