const mongoose =require('../util/mongoose');
const Moment = require('moment');
const PATH = require('path');
const fs = require('fs-extra');


//创建
var Match = mongoose.model('matchs', new mongoose.Schema({

    matchLogo:String,
    matchTitle:String,
    matchDetail:String,
    startTime:String,
    overTime:String,
    lastTime:String,
    createTime:String
}));

//返回数据列表
const listall = (_quire = {} )=>{

    return Match.find(_quire)
            .sort({createTime: -1})
            .then((results)=>{
                return results
            }).
            catch((err)=>{
                return false
            })

}

const list = async ( {pageNo = 1, pageSize = 10, search= ''} )=>{


    let reg = new RegExp(search,'g')

    let _query = {
        $or:[
            { matchTitle: reg },
            { matchDetail: reg }
        ]
    }

    let _all_items = await listall(_query)
    return Match.find(_query)
    .sort({createTime:-1})
    .skip((pageNo-1)*pageSize)
    .limit(~~pageSize)
    .then((results)=>{
        return {
            items: results,
            pageInfo: {
                pageNo,
                pageSize,
                total: _all_items.length,
                totalPage: Math.ceil(_all_items.length/pageSize),
                search
            }
        }
    }).catch((err)=>{
        return false
    })
}

//默认logo
let default_logo = '/uploads/match_logos/ZCOOL.jpg'
//保存数据
const save = (body)=>{

    console.log(body)

    let _timestamp = Date.now();
    let _lastTime = Math.ceil((Date.parse(body.overTime)-_timestamp)/1000/60/60/24) ;
    body.matchLogo=body.matchLogo || default_logo;
    return new Match({
        ...body,
        createTime:_timestamp,
        lastTime:_lastTime
    }).save()
    .then((results)=>{
        return results;
    })
    .catch((err)=>{
        return false;
    })

}

//删除数据
const remove = async ( { id,pageNo,pageSize } )=>{
    //删除数据库中某条数据
    let _row = await listone({ id })
    return Match.deleteOne({_id:id})
            .then(async (results)=>{
                //获取最新的数据
                let _all_items = await listall()

                results.deleteId = id;
                results.isBack = (pageNo-1)*pageSize >= _all_items.length 

                //如果有图片  删除图片
                if(_row.matchLogo && _row.matchLogo !== default_logo){
                    
                    fs.removeSync(PATH.resolve(__dirname,'../public'+_row.matchLogo))
                }
                return results;
            }).catch((err)=>{
                return false;
            })
}


//返回某条数据
const listone = ({ id }) =>{
    return Match.findById(id)
            .then((results)=>{
                return results;
            }).catch((err)=>{
                return false;
            })
}

//更新某条数据

const update = (body) =>{
    if ( !body.matchLogo ) delete body.matchLogo
    if(body.republish){
        let _timestamp = Date.now();
        let moment = Moment(_timestamp);
        body.createTime = _timestamp;
        let _lastTime = Math.ceil((Date.parse(body.overTime)-_timestamp)/1000/60/60/24) ;
    }
    return Match.updateOne({_id:body.id},{...body})
            .then((results)=>{
                return results;
            }).catch((err)=>{
                return false;
            })
}








module.exports = {
    list,
    listall,
    save,
    remove,
    listone,
    update
}