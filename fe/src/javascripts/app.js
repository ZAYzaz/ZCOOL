// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'
// 主体结构视图
const body_template = require('./views/body.html')
// 引入登录权限验证
import { userSigninAuth } from './util/auth'
import user_controller from './controllers/user'

// 渲染整体内容结构
$('#wrapper').html(body_template) 
// // 启动路由
 //router.init() 

//window.location.href = "/admin.html"

const init = async ()=>{
    let isSignIn = await userSigninAuth()
    if ( isSignIn ) {
        $('#wrapper').removeClass('hidden')
             
        router.init()
        user_controller.renderUserInfo()       
    }else {
        window.location.href="/admin.html"
    }

}

init()