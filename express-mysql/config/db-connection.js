// config目录内新建db.js,来实现基本的数据库连接
var mysql = require("mysql");
let db = {}

// 操作，注意使用异步返回查询结果
db.execute = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        callback(error,results);//返回
    });
}

//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}

//获取数据库连接
db.connection = function(){
    //数据库配置
    let connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"express_demo",
        port:3306
    });
    //数据库连接
    connection.connect(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    return connection;
}
module.exports = db;