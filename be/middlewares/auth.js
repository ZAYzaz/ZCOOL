const jwt = require('jsonwebtoken')
const fs = require('fs')
const PATH = require('path')

const userSigninAuth = (req, res, next) => {
    //console.log('用户权限验证');
    try {

       // let _public = fs.readFileSync(PATH.resolve(__dirname, '../keys/public.key'))
        
        //let decoded = jwt.verify(req.query.token, _public, { algorithms: 'RS256' })
        
        var decoded = jwt.verify(req.query.token, 'i hate u'); 
         
         //_time为：当前时间-jwt签发时间，即为登录的时间
        let _time =  (Date.now() / 1000) - decoded.iat//iat (Issued At)：签发时间

        console.log('decoded查看',+Date.now(),_time,decoded);

        //设置时效
        let _expires = 30*100
        console.log(_time, _expires,999999999)
        if ( _time > _expires ) {
           // console.log(_time, _expires,999999999)
            res.render('user', {
                code: 403,
                data: JSON.stringify({ msg: '登录过期，请重新登录' })
            })
        } else {
            console.log(_time, _expires,888881111111111111113888999999999)
            req.token = decoded
            next()
        }        
    } catch(err) {
        console.log("这是error")
        res.render('user', {
            code: 403,
            data: JSON.stringify({ msg: '请登录后操作' })
        })
    }
}

module.exports = {
    userSigninAuth
}