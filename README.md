# nodejs操作mongodb

> mongodb 是i款面向文档的数据库

- mongodb
- Robomongo
- nodejs
- mongoose

## 第一步：安装mongodb：

windows下安装.msi软件，一路next，ok！

## 第二步：启动mongodb数据库服务：

      mongod --dbpath 路径/data

## 第三步：安装mongoose：

      yarn add mongoose

      或者

      cnpm install mongoose --save-dev

## 第四步：连接数据库

  mongodb.js:
  ```js
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

  ```

  city.js:

```js

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

```

handeldb.js

```js


  const City = require('./city');

  //add
  function add() {

    const city = new City({
      title:  '北京',
      adress: '增光路16号院',
      body: '目前是晚上8点24分，我正字啊学习nodejs操作mongodb',
      comments: [{body: '好好好好非常好', date: Date.now()}],
      hidden: true,
      meta: {
        votes: 1000,
        favs: 34
      }
    });

    city.save(function(err,doc){
      if(err){
        console.log(`数据保存失败，错误信息是${err}`);
      }else {
        console.log(`数据保存成功，数据为${doc}`);
      }
    });

  }

  //find 查找
  function find(obj) {
    City.find(obj,function(err,doc){
      if(err){
        console.log(`数据查询失败，错误信息是${err}`);
      }else {
        console.log(`数据查找成功，数据为${doc}`);
      }
    })
  }

  //update
  function update(){
    City.update({_id:'5a02fa39f782a82a8cecf35f'},{adress:'甘家口大厦'},function(err,doc){
      if(err){
        console.log(`数据修改失败，错误信息是${err}`);
      }else {
        console.log(`数据修改成功，数据为${doc}`);
      }
    })
  }

  //del
  function del(){
    City.remove({_id: '5a031e579c11943318d79108'},function(err,doc){
        if(err){
          console.log(`数据删除失败，错误信息是${err}`);
        }else if(doc.result.n == 1){
            console.log(`数据删除成功！`);
        }else if(doc.result.n == 0){
            console.log(`已经删掉了哦`);
        }
    });
  }

  module.exports = {
    add,
    find,
    update,
    del
  }

```

### 第五步：

app.js 是入口文件，在这个js里面操作mongodb的增删改查。
