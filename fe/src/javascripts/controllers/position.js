 

import { bus, handleToastByData } from '../util'
// 职位列表视图
import position_list_template from '../views/position-list.html'
// 添加职位视图
import position_save_template from '../views/position-save.html'
// 修改职位视图
import position_update_template from '../views/position-update.html'
// model
import position_model from '../models/position'

import qs from 'querystring'

import { log } from 'util';

//判断删除状态防止用户多次点击

//用户不停点击时可能存在原本dom对应的数据信息已经被删除，但是页面没来得及渲染所以
//dom仍然存在，连续的点击dom但是信息已经消失,ajax拿不到数据，promise报错

//解决办法:定义一个删除状态，在页面渲染之后再允许操作
let _isRemoving = false

// 列表视图的控制器
const list = async (req, res, next) => {
    req.query=req.query||{}

    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 5,
        search: req.query.search||''
    }
    // 编译模板 
    let html = template.render(position_list_template, {
        data: (await position_model.list(_page)).data // 获取到列表数据
    })
    res.render(html)
    _isRemoving = false;
    bindListEvent(_page)// 给添加按钮绑定事件

    // 显示搜索关键字
    $('.position-list #keywords').val(_page.search)
}

// list的事件绑定
const bindListEvent = (_page) => {
    // 添加按钮点击跳转到添加路由
    $('.position-list #addbtn').on('click', function () {
        bus.emit('go','/position-save')
    })
    $('.position-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')

        //console.log(id);
        
        bus.emit('go','/position-update', { id })
    })
    $('.pos-remove').on('click', function(){
        //console.log("前端删除1");
    
      // handleRemovePosition.bind(this,_page)()//要调用，否则不执行 

       handleRemovePosition.call(this, _page)
    })
    $('.position-list #possearch').on('click', function () {
        let _search = $('.position-list #keywords').val()
        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go',`/position-list?${$.param(_params)}`)
    })
}
// 删除操作
const handleRemovePosition = async function (_page)  {
    let id = $(this).parents('tr').data('id')
    if(_isRemoving)  return false
    _isRemoving = true
    let _data = await position_model.remove({id: id,..._page}) 
     
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
             // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            let _pageNo = _page.pageNo
            console.log('_pageNo啊',_pageNo);
            //若data.isBack为ture则，页码减1，否则减0，进行翻页操作
            _pageNo -= data.isBack ? 1 : 0
             
            //判断，如果是第一页的最后一个，经过上面减一，就变成pageNo=0了，所以要加_pageNo=1
            if(_pageNo===0) {
                _pageNo=1
            }
            
            bus.emit('go', '/position-list?pageNo='+_pageNo+'&_='+data.deleteId+ '&search='+_page.search)
        }
    })
}

// save视图的控制器
const save = async (req, res, next) => { 
    res.render(position_save_template)
    bindSaveEvent()
}

// save的事件绑定
const bindSaveEvent = () => {
    // 返回按钮逻辑
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position-list')
    })
    $('.position-save #save-form').submit(handleSaveSubmit)
}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    
    e.preventDefault()

    if ( _isLoading ) return false;

    _isLoading = true
    // 拿到form的数据
    //  let _params = qs.parse($(this).serialize())
    // let result = await position_model.save(_params)

    //当引入jquery.form.js插件时，就不需要像上面那样写了,会通过在models中的ajaxSubmit直接取到
    let result = await position_model.save()
    console.log(result);
    

    _isLoading = false

    handleToastByData(result)

    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/position-list')
    // }})
 
}


const update = async (req, res) => {

    //console.log(req,res);
    
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染
    let html = template.render(position_update_template, {
        data: (await position_model.listone({ id })).data // 获取到列表数据
    })
    res.render(html)
    bindUpdateEvent()
}

const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.position-update #back').on('click', function () {
        bus.emit('go', '/position-list')
    })

    $('.position-update #update-form').submit(handleUpdateSubmit)
}

//点击修改页面的提交按钮时的操作
const handleUpdateSubmit = async function (e) {
    e.preventDefault();
    // let _datastr = $(this).serialize()
    // let _data = qs.parse(_datastr)
   
    // console.log(_datastr,_data,"serilaze");
    
    //改为插件后无需上传_data
    let _results = await position_model.update()  
    handleToastByData(_results)
}


export default {
    list,
    save,
    update
}