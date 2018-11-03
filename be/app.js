var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan');

var { version } = require('./config')

var session = require('express-session')

// 路由工具
var indexRouter = require('./routes/index'); 
var positionRouter = require('./routes/position');
var activityRouter = require('./routes/activity');
 
var matchRouter = require('./routes/match');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');



// 应用程序
var app = express();

// view engine setup
//代码用于配置页面文件(例如 .ejs 文件)的根目录，
//设置之后 访问 ./index 则等同于访问 views/index.ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express-session
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {  httpOnly: false, secure: false, maxAge: 1000 * 60 * 5 }
// }))

// 使用各种中间件
app.use(logger('dev'));
// body-parser 处理form-data和request payload数据
// express 4.X 内部集成了body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());// 解析cookie

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 启用路由工具
app.use('/', indexRouter);
 
app.use('/api/'+ version +'/position', positionRouter);
app.use('/api/'+ version +'/activity', activityRouter);

app.use('/api/'+ version +'/match', matchRouter);
app.use('/api/'+ version +'/admin', adminRouter);
app.use('/api/'+ version +'/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//各种提交一直不成功   真的要炸了