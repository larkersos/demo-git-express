var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var roleSchema = new Schema({
    type:String,
    name:String
});
module.exports = roleSchema;