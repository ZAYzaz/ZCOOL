import SMERouter from 'sme-router'

import bus from '../util/bus'

import home_template from '../views/home.html'
import not_found_template from '../views/404.html'

import position_controller from '../controllers/position'

var router = null

// 启动路由的方法
const _init = () => {

    router = new SMERouter('router-view')

    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })

    

    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(home_template)
    })

    router.route('/position-save', position_controller.save)

    router.route('/position-list', position_controller.list)

    
    router.route('/position-update', position_controller.update)


   


    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }
        
    })

    // 给bus绑定事件
    // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
    bus.on('go', (path, body = {}) =>  router.go(path, body) )
    bus.on('back', () => {router.back() })  
    

    // 给按钮添加事件
    _navLink()
    _treeMenu()
}

// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
           
}

const _treeMenu = () => {
    // $('.treeview')[0].removeEventListener('click');

}


export default {
    init: _init,
    navLink: _navLink
}




// router.route('/user/:id', (req, res, next) => {
//   const { params, query, body , url, route } = req

//   console.log(params.id) // output => 123
//   console.log(query.name) // output => hwen
//   console.log(body.mes) // output => hallo world
//   console.log(url) // output => /user/123?name=hwen
//   console.log(route) // output => /user/:id
// })

// router.go('/user/123?name=hwen', { mes: 'hallo world'})