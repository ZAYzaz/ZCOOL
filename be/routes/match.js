var express = require('express');
var router = express = express.Router();
var fileUpload = require('../middlewares/match_fileUpload');
var match_controller = require('../controllers/match');

const resApplistionJson = (req,res,next)=>{
    res.set('content-type','application/json; charset=utf-8')
    next()
}

router.use(resApplistionJson)

router.get('/listall',match_controller.listall);

router.get('/list',match_controller.list);

router.post('/save',fileUpload,match_controller.save);

router.delete('/remove',match_controller.remove);

router.get('/listone', match_controller.listone)

router.post('/update', match_controller.update)

module.exports = router;