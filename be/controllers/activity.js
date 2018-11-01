//const { errorData } = require('../util')

const { handleData } = require('../util')
const activity_model = require('../models/activity')

// list控制器
// 返回全部数据
const listall = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await activity_model.listall()
    handleData(_data, res, 'activity')
}

const list = async (req, res) => {
   // res.set('content-type', 'application/json; charset=utf8')
    let _data = await activity_model.list(req.query)

    // let err = errorData(_data, res, 'position')

    // if ( err ) res.render('position', { 
    //     code: 200, 
    //     data: JSON.stringify(_data) 
    // })

    handleData(_data, res, 'activity')
}

// 添加职位
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    
    //res.set('content-type', 'application/json; charset=utf8')
    let _data = await activity_model.save(req.body)

    //console.log(_data);//拿不到完整数据？？？为什么=>req.body已经拿到全部的输入框中的值，
    //但是_data无法完全得到？为什么
 
 

    handleData(_data, res, 'activity')
}


// 删除职位
const remove = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
     
    
    //请求方式为get时，为req.query,采用delete之后，需改为req.body
    let _data = await activity_model.remove(req.body)
    console.log('删除req.body',req.body);
    
    handleData(_data, res, 'activity')
}

const listone = async (req, res) => {
   // res.set('content-type', 'application/json; charset=utf8')
    let _data = await activity_model.listone(req.query)
     
    
    handleData(_data, res, 'activity')
}

const update = async (req, res) => {
     
    
   // res.set('content-type', 'application/json; charset=utf8')
    let _data = await activity_model.update(req.body)
    handleData(_data, res, 'activity')
}

module.exports = {
    listall,
    list,
    save,
    remove,
    listone,
    update
}