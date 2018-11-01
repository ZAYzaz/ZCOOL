var express = require('express');
var router = express.Router();


var fileUpload = require('../middlewares/fileUpload')

var activity_controller = require('../controllers/activity')



// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)


/* GET home page. */
router.get('/listall', activity_controller.listall)

router.get('/list', activity_controller.list)
router.post('/save',  fileUpload, activity_controller.save)

router.delete('/remove', activity_controller.remove)

router.get('/listone', activity_controller.listone)

router.post('/update', fileUpload,  activity_controller.update)


module.exports = router;
