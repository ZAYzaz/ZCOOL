
import match_list_template from '../views/match/match-list.html'
import match_save_template from '../views/match/match-save.html'
import match_update_template from '../views/match/match-update.html'

import match_model from '../models/match_mondel'
import { bus, handleToastByData } from '../util'
import qs from 'querystring'

//判断删除状态防止用户多次点击

//用户不停点击时可能存在原本dom对应的数据信息已经被删除，但是页面没来得及渲染所以
//dom仍然存在，连续的点击dom但是信息已经消失,ajax拿不到数据，promise报错

//解决办法:定义一个删除状态，在页面渲染之后再允许操作
let _isRemoving = false;


//列表视图的控制器
const list  = async (req,res,next)=>{
    req.query = req.query || {}

    console.log("match-list123123")

    let _page = {
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search
    }
    //渲染模板
    let _html = template.render(match_list_template,{
        data:(await match_model.list(_page)).data
    })
    res.render(_html)

    //设置状态为  不是正在删除
    _isRemoving = false;
    bindListEvent(_page);

    //搜索框显示搜受关键字
    $('.match-list #keywords').val(_page.search)
}

//list 事件的绑定
const bindListEvent = (_page)=>{
    $(".match-list #addbtn").on('click',()=>{
        bus.emit('go','/match-save')
    })
    //绑定删除事件
    $('.match-list .pos-remove').on('click',function(){
        handleRemovematch.call(this,_page)
    });
    //绑定修改
    $('.match-list .pos-update').on('click',function(){
        let id = $(this).parents('tr').data('id');
        bus.emit('go','/match-update',{ id })
    });
    //搜索
    $('.match-list #possearch').on('click',function(){
        let _search = $('.match-list #keywords').val()
        bus.emit('go',`/match-list?search=${_search}&pageNo=1`)
    })
}




//save视图渲染控制器
const save = async (req,res,next)=>{
    //渲染视图
    res.render(match_save_template);
    //绑定save事件
    bindSaveEvent();

}

//save  事件的绑定
const bindSaveEvent = ()=>{
    //返回列表
    $(".match-save #back").on('click',()=>{
        bus.emit('back','/match-list')
    })
    //保存match
    $('.match-save #save-form').submit(handleSavematch)
}


//保存职位
//防止多次提交
let _isLoading = false;
const handleSavematch = async function(e){
    
    e.preventDefault();
    if(_isLoading) return false;
    _isLoading = true;
    let result = await match_model.save();
    _isLoading = false;
    handleToastByData(result);
}


//update 视图控制器
const update = async(req,res)=>{
    //取出要更新数据的id
    let { id } = req.body;
    //渲染
    let _html = template.render(match_update_template,{
        data:(await match_model.listone( { id } )).data
    })
    res.render(_html)
    //绑定事件
    bindUpdateEvent()
}

//更新事件
const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.match-update #back').on('click', function () {
        bus.emit('go', '/match-list')
    })
    //提交
    $('.match-update #update-form').submit(handleUpdateSubmit)
}
//提交一条数数据更新
const handleUpdateSubmit = async function (e) {
    e.preventDefault();
    let _datastr = $(this).serialize()
    let _data = qs.parse(_datastr)
    let _results = await match_model.update(_data)  
    handleToastByData(_results)
}





//删除操作
//防止多次操作

const handleRemovematch = async function(_page){
    //  如果状态为正在删除则直接返回
    if(_isRemoving) return false;
    let id = $(this).parents('tr').data('id');
    //修改状态为  正在删除
    _isRemoving = true;
    let _data = await match_model.remove({id:id,..._page});
    console.log("哈哈哈哈")
    
    handleToastByData(_data,{
        isReact:false,
        success: (data)=>{
            //删除成功后
            let _pageNo = _page.pageNo
            _pageNo -= data.isBack? 1 : 0
            if(_pageNo == 0) _pageNo = 1;
            bus.emit('go',`/match-list?&search=${ (_page.search || '') }&pageNo=${_pageNo}&_=${data.deleteId}`)
        }
    })

}








export default{
    list,
    save,
    update
}