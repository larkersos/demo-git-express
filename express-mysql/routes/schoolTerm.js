var express = require('express');
var router = express.Router();

var db = require("../config/db");
var dbConnection = require("../config/db-connection");

var tableName = "school_term";

/* GET users listing. */
/**
 * 查询列表页
 */
router.get('/', function(req, res, next) {
  let connection = dbConnection.connection();
  let sqlString = "select * from "+tableName;
  dbConnection.execute(connection,sqlString,null,function(err,rows){
      if(err){
        console.log("=======err:"+JSON.stringify(err));
        res.render("school/list",{title:"列表",year:"",term:"",dataList:[]});
      }else {
        console.log("=======rows:"+JSON.stringify(rows));
        res.render("school/list",{title:"列表",year:"",term:"",dataList:rows});
      }
  });
  dbConnection.close(connection);
});

/**
 * 添加
 */
router.get("/toAdd",function(req,res,next){
  res.render("school/add",{year:2018,term:1});
});
router.post("/add",function(req,res,next){
  var year = req.body.year;
  var term = req.body.term;
  db.query("insert into "+tableName+"(year,term) values('"+year+"','"+ term +"')",function(err,rows){
    if(err){
      res.send("新增失败"+err);
    }else {
      res.redirect("/school");
    }
  });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
  var id = req.params.id;
  db.query("delete from "+tableName+" where id = " + id,function(err,rows){
    if(err){
      res.send("删除失败"+err);
    }else {
      res.redirect("/school");
    }
  });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
  var id = req.params.id;
  var sql = "select * from "+tableName+" where id = " + id;
  console.log(sql);
  db.query(sql,function(err,rows){
    if(err){
      res.send("修改页面跳转失败");
    }else {
      res.render("school/update",{condition:rows[0]});
    }
  });
});
router.post("/update",function(req,res,next){
  var id = req.body.id;
  var year = req.body.year;
  var term = req.body.term;
  var sql = "update "+tableName+" set year = '"+ year +"',term = '"+ term +"' where id = " + id;
  console.log(sql);
  db.query(sql,function(err,rows){
    if(err){
      res.send("修改失败 " + err);
    }else {
      res.redirect("/school");
    }
  });
});

/**
 * 查询
 */
router.post("/search",function(req,res,next){
  var year = req.body.year;
  var term = req.body.term;
  var sql = "select * from "+tableName;

  var condition = " where 1=1 "
  if(year){
    condition += " adn year = '"+ year +"'";
  }
  if(term){
    condition += " and term = '" + term + "'";
  }

  sql += condition;
  db.query(sql,function(err,rows){
    if(err){
      res.send("查询失败: "+err);
    }else{
      res.render("school/list",{title:"列表",dataList:rows,year:year,term:term});
    }
  });
})


module.exports = router;
