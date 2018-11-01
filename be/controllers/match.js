const {handleData} = require('../util');
const  match_model = require('../models/match');



//list 控制器
const listall = async (req,res)=>{
    let _data = await match_model.listall()
    handleData(_data, res, 'match')
}


//根据 _page获取数据
const list = async (req,res)=>{
    let _data = await match_model.list(req.query)
    handleData(_data, res, 'match')
}

// 添加职位
    const save = async (req,res) => {
        let _data = await match_model.save(req.body);
        console.log(req.body,123)
        handleData(_data, res, 'match')
    }

//删除职务
    const remove = async (req,res) =>{
        let _data = await match_model.remove(req.body);
        handleData(_data, res, 'match')
    }

//获取某条数据
const listone = async (req,res) =>{
    console.log(req.query,111)
    let _data = await match_model.listone(req.query);
    handleData(_data, res, 'match')
}


//更新某条数据
const update = async (req,res) =>{
    let _data = await match_model.update(req.body);
    handleData(_data, res, 'match')
}



module.exports = {
    list,
    listall,
    save,
    remove,
    listone,
    update
}