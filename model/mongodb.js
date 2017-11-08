var mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost/ceshi';

mongoose.connect(DB_URL);

//连接成功
mongoose.connection.on('connected',function () {
  console.log(`mongodb连接成功,数据库地址为：${DB_URL}`);
});

//连接异常
mongoose.connection.on('error',function(err){
  console.log(`数据库连接失败，错误信息是：${err}`);
});

module.exports = mongoose;
