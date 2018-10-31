const URL = require('url')
const _none = () => {}

import user_model from '../models/user'


// 验证用户登录状态
const userSigninAuth = async () => {
   // console.log('util/auth啊');
    
    let _token = localStorage.getItem('token') || ''
    let isSignIn = await user_model.isSignIn({ token: _token })
   // console.log('util/auth233啊',isSignIn);
    //alert(isSignIn.status,88888)
   // alert(!!(isSignIn.status === 200))
    return !!(isSignIn.status === 200)
}

export  {
    userSigninAuth
}