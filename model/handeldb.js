
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
