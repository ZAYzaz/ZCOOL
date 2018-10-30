const jwt = require('jsonwebtoken')
const userSigninAuth = (req, res, next) => {
    //console.log('用户权限验证');
    
    try {
        var decoded = jwt.verify(req.query.token, 'i hate u'); 
        let _time =  (Date.now() / 1000) - decoded.iat
        let _expires = 30 
        if ( _time > _expires ) {
            res.render('user', {
                code: 403,
                data: JSON.stringify({ msg: '登录过期，请重新登录' })
            })
        } else {
            req.token = decoded
            next()
        }        
    } catch(err) {
        res.render('user', {
            code: 403,
            data: JSON.stringify({ msg: '请登录后操作' })
        })
    }
}

module.exports = {
    userSigninAuth
}