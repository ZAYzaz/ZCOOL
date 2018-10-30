

const mongoose = require('../util/mongoose')
const Moment = require('moment') // 时间格式化
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化

// 创建的Model模型 （collection）这里,我们一定要搞清楚一个东西.
// 实际上, mongoose.model里面定义的第一个参数,比如’Tank’, 并不是数据库中的, 
//collection. 他只是collection的单数形式, 实际上在db中的collection是’Tanks’.
var PositionModel = mongoose.model('job', new mongoose.Schema({
    // "logo": "https://img.zcool.cn/community/04afbd58b78a40a801219c77d0347a.jpg",
    // "post_name": "平面设计师",
    // "companyltd": "尚潮创意开发",
    // "post_salary": "8k-16k",
    // "city": "北京",
    // "city_id": 3021,
    // "experience_name": "经验不限",
    // "diploma_name": "学历不限",
    // "publishTime": "10小时前发布",
    // "postEffectTime": "2018-10-25 08:52:01",
    // "tag": "氛围自由、不定期福利、超长假期",
    // "industryAndStageName": "艺术/其他/不需要融资",
    // "industryName": "艺术/其他",
    // "stage_name": "不需要融资",
    // "size_name": "1-50人",
    // "requirement": "<p>岗位职责</p>\n <p>1、负责故宫博物院（故宫淘宝）文创产品的视觉设计工作；</p>\n <p><br></p>\n <p>任职要求</p>\n <p>1、美术相关专业，具有较强的素描造型和色彩表达能力；</p>\n <p>2、熟练运用PS、AI、手绘板等设计工具进行创作；</p>\n <p>3、创意丰富，思维活跃，对时尚和传统的碰撞有敏锐的捕捉和吸收力； 4、有过文创产品设计经验者优先。</p>\n <p>附：请随简历附相关作品或作品链接。</p>\n <p><br></p>\n <p>可参考的产品：http://gugong1925.taobao.com</p>",
    // "area": "东城区东四北大街107号科林大厦",


    logo: String,
    post_name: String,
    companyltd: String,
    post_salary: String,
    city: String,
    city_id: String,//eg: 3021,
    experience_name: String,
    diploma_name: String,
    publishTime: String,//eg:"10小时前发布",
    postEffectTime: String,//eg:"2018-10-25 08:52:01",
    createTime: String,
    tag: String,
    industryAndStageName: String,
    industryName: String,
    stage_name: String,
    size_name: String,
    requirement: String,
    area: String
}));


// 返回列表全部数据
const listall = (_query = {}) => {
    // limit skip


    return PositionModel.find(_query).sort({ createTime: -1 }).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}
// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 10, search = '' }) => {
    //模糊搜索的查询条件  
    let reg = new RegExp(search, 'g')
    // limit skip

    let _query = { // 匹配各个字段值只要有一个字段含有关键字
        $or: [//表示符合某一项，则匹配

           // { logo: reg },
            { post_name: reg },
            { companyltd: reg },
            { post_salary: reg },
            { city: reg },
            { city_id: reg },//eg: 3021,
            { experience_name: reg },
            { diploma_name: reg }, 
            { tag: reg },
            { industryAndStageName: reg },
            { industryName: reg },
            { stage_name: reg },
            { size_name: reg },
            { requirement: reg },

        ]
    }// 查询的约定条件

    let _all_items = await listall(_query)//在所有列表中查询

    return PositionModel.find(_query)
        .sort({ createTime: -1 })

        .skip((pageNo - 1) * pageSize)// 从哪一页开始
        .limit(~~pageSize)// 截取多少


        .then((results) => {
            return {
                items: results,
                pageInfo: { // 页码信息
                    pageNo, // 当前页
                    pageSize, // 一页数量
                    total: _all_items.length, // 总数
                    totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
                    search  // 搜索关键字
                }
            }
        }).catch((err) => {
            return false
        })
}

let default_logo = '/uploads/logos/default.jpg'

// 保存职位数据
const save = (body) => {
    // 此时的时间
    console.log('保存接口', body);

    console.log('保存body展开', { ...body });
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)
    //输入图片则保存输入图片，否则显示默认图片
    body.logo = body.logo || default_logo;

    return new PositionModel({
        ...body,
        createTime: _timestamp,
        postEffectTime: moment.format("YYYY-MM-DD, hh:mm")
    })
        .save()
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })

}

// 删除职位的model
const remove = async ({ id, pageNo, pageSize }) => {
    // 删除数据库中的某一条数据


    //删除一条数据时，将对应的图片删除 
    let _row = await listone({ id })


    return PositionModel.deleteOne({ _id: id }).then(async (results) => {

        //  获取最新的数量
        let _all_items = await listall()

        results.deleteId = id
        results.isBack = (pageNo - 1) * pageSize >= _all_items.length

        console.log("isBack", results.isBack, pageNo, pageSize);
        // 有图片就删图片
        if (_row.logo && _row.logo !== default_logo) {
            fs.removeSync(PATH.resolve(__dirname, '../public' + _row.logo))
        }
        return results
    }).catch((err) => {
        //fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' + JSON.stringify(err))
        return false
    })
}

const listone = ({ id }) => {
    //console.log(PositionModel.findById(id));

    return PositionModel.findById({ _id: id }).then((results) => {
        // results.listoneId = id
        return results
    }).catch((err) => {
        return false
    })
}

const update = (body) => {
    //如果用户未上传logo,则把logo字段删除，防止覆盖之前的logo字段
    //console.log('update接口1', body);
    if (!body.logo) delete body.logo

    // console.log('update接口2', body);

    //是否重新发布
    if (body.republish) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.postEffectTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return PositionModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}
module.exports = {
    listall,
    list,
    save,
    remove,
    listone,
    update
}