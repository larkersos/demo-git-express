var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/file-upload', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var bodyParser = require('body-parser');
router.use(bodyParser.json());
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },//指定硬盘空间的路径，这里可以是任意一个绝对路径，这里为了方便所以写了个相对路径
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.originalname + '-' + Date.now() + '.'+fileFormat[fileFormat.length - 1]);//指定文件名和扩展名
  }
});//设置用硬盘的存储方法
var upload = multer({ storage: storage });//表示用硬盘的存储方法
// var upload = multer({dest: './public/uploads'});

router.use(upload.single('thumbnail'));//运用中间件，并且指明文件名,此名需要同html input name的文件名一致
//router.use(upload.array('thumbnail', 3));


router.post('/file-upload' , function(req, res) {
  console.log(req.body);
  //upload(req, res, function (err) {
  //  if (err) {
  //    res.send(err);
  //    return;
  //  }
  //  else{
  //    res.send(req.file);//服务端响应把客户端获得的文件信息显示在客户端
  //  }
  //});//直接在app.post()中调用中间件upload，并且把错误信息发送到客户端



  res.send(req.file);//服务端响应把客户端获得的文件信息显示在客户端
});


module.exports = router;
