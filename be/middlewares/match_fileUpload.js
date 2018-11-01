var PATH = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    //文件存储的位置
    destination: function (req, file, cb) {
      cb(null,PATH.resolve(__dirname,'../public/uploads/match_logos'))
    },
    filename: function (req, file, cb) {

        let _originalName = file.originalname // 原名
        let _extName = PATH.extname(_originalName); // 后缀名
        let _baseName = PATH.basename(_originalName, _extName); // 文件名
        let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖
    
        // 将图片的路径放入到req.body中的，下个中间件就可以取用了
        req.body.matchLogo = '/uploads/match_logos/' + _filename


        cb(null, _filename)
    }
  })

//过滤文件类型
function  fileFilter ( req,file,cb ){
    let _flag = file.mimetype.startsWith('image')

    cb(_flag ? null : new Error('请上传正确图片的格式'), _flag )
}


 var upload = multer({ storage,fileFilter }).single('matchLogo')

const fileUpload = function(req,res,next){
    upload(req,res,function(err){
        if (err) {
            res.set('content-type', 'application/json; charset=utf8')
        res.render('match', {
            code: 501,
            data: JSON.stringify({ msg: '请上传正确格式的图片' })
        })
      } else {
        // 一切都好
        next()
      }
    })
}

  module.exports = fileUpload