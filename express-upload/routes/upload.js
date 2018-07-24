var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/file-upload', function(req, res, next) {
  res.render('index', { title: 'Hello Express' });
});

var bodyParser = require('body-parser');
router.use(bodyParser.json());
var multer = require('multer');

var moment = require('moment');
var todayStr = moment().format('YYYY-MM-DD');
var uploadPath = 'E:\\wwl\\larkerso-git\\git-node-demo\\gatsby-strapi-tutorial\\api\\public\\uploads\\express\\'+ todayStr;
console.log("uploadPath="+uploadPath);

var fs = require("fs");
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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },//指定硬盘空间的路径，这里可以是任意一个绝对路径，这里为了方便所以写了个相对路径
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.originalname + '-' + Date.now() + '.'+fileFormat[fileFormat.length - 1]);//指定文件名和扩展名
  }
});//设置用硬盘的存储方法
var upload = multer({ storage: storage });//表示用硬盘的存储方法
// var upload = multer({dest: './public/uploads'});

router.use(upload.single('thumbnail'));//运用中间件，并且指明文件名,此名需要同html input name的文件名一致
//app.use(upload.array('thumbnail', 3));


var http = require('http');
var querystring = require('querystring');

router.post('/file-upload' , function(req, res) {
  console.log(req.body);


  var post_data = querystring.stringify({
    code:'code2018001',
    urlPath:req.file.path
  });

  var post_options = {
    host:'localhost',
    port:1337,
    path:'/wxmedia',
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    }
  };
  console.log('post_options: ' + post_options);

  var post_req = http.request(post_options, function(res2) {
    res2.setEncoding('utf8');
    res2.on('data', function (chunk) {
      console.log('Response: ' + chunk);
      onetimetoken_data = JSON.parse(chunk);
      res.send(req.file);//服务端响应把客户端获得的文件信息显示在客户端
    });
    console.log('post_req Response: ' + res2);
  });
  post_req.write(post_data);
  post_req.end();


});


module.exports = router;
