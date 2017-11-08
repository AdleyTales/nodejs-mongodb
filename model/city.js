
// 第2步 schema 为文档做一个描述 为这个集合文档声明字段  相当于表里面的字段
const mongoose = require('./mongodb');

var Schema = mongoose.Schema;

const City = new Schema({
  title:  String,
  adress: String,
  body: String,
  comments: [{body: String, date: Date}],
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

module.exports = mongoose.model('City',City,'city');
