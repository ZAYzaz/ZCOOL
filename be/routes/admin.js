var express = require('express');
var router = express.Router();


//var fileUpload = require('../middlewares/fileUpload')

var admin_controller = require('../controllers/admin')



// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)


/* GET home page. */
  
router.post('/signup', admin_controller.signup)
router.post('/signin', admin_controller.signin)
// router.post('/signup', (req , res) => {
//     res.send('ok')
// }) 


module.exports = router;
