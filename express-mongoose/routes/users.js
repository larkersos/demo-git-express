var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var crypto = require('crypto');// 加密处理

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User' });
});

router.get('/login',function(req,res,next){
  res.render('login', { title: '用户登录' });
});
router.post('/login',function(req,res,next){
//  var user = new User({
//      username:'admin',
//      password:'123'
//  });
//  user.save((err)=>{ //添加
//      console.log('save status:', err ? 'failed' : 'success');
//  });

//  User.find({ //查找
//      username:'admin',
//      password:'123'
//  },(err, docs)=>{
//      if(err){
//          res.send('server or db error');
//      }else{
//          console.log('登录成功用户：'+docs);
//          if(docs.length==0){
//              res.send('用户名或密码有误');
//          }else{
//              req.session.user = {
//                  _id:docs[0]._id,
//                  username:docs[0].username
//              };
//              res.send('login success');
//          }
//      }
//  });
  var name = req.body.name,
      password = req.body.password;

  //生成密码的 md5 值
  var md5 = crypto.createHash('md5');
  password = md5.update(req.body.password).digest('hex');

  User.findOne({ //查找一条
    username:name,
    password:password
  },function(err, doc){
    var msg="";
    if(err){
      msg = 'server or db error';
    }else{
      console.log('登录成功用户：'+doc);
      if(doc==null){
        msg = '用户名或密码有误';
      }else{
        msg = 'login success,用户：' + doc;
      }
      res.render('result', { title: '提交结果',message:msg});
  }
})

});

router.get('/reg',function(req,res,next){
  res.render('register', { title: '用户注册' });
});
router.post('/reg',function(req,res,next){

  var name = req.body.name;
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');

  var newUser = new User({
    username: name,
    password: password
  });
  var msg="";
  //检查用户名是否已经存在
  User.findOne({username:newUser.username}, function (err, user) {
    if (err) {
      msg = err;
      res.render('result', { title: '提交结果',message:msg});
    }else if (user) {
      msg = '用户已存在!';
      res.render('result', { title: '提交结果',message:msg});
    } else {
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          msg = err;
        }else{
          msg = '注册成功! user:'+user;
        }
        res.render('result', { title: '提交结果',message:msg});
      });
    }
  });

});


module.exports = router;
