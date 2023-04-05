var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guestRouter = require('./routes/guestbook'); 
var ajaxRouter = require('./routes/ajaxtest'); 
var gradeRouter = require('./routes/grade');
// 외부의 모듈을 메모리로 가져온다 = guestbook.js 파일을 끌고 들어오겟단 얘기인듯?
var app = express();

// view engine setup(환경변수 설정)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어들 사용
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static - image, css, js 이런 파일들을 Public으로 놓겠다
// path.join : path - 전체 디렉토리 경로에 대한 관리를 도와준다
// join은 합치는거 -> path.join(__dirname, 'public') 이렇게 쓰면 
// c:/temp/public처럼 지금 경로 뒤에 public 붙여서 전체 경로를 만들어줌
// node.js에서 __(언더스코어2)로 시작하는 변수나 함수는 내장변수나 내장함수임
// __dirname : 내장변수! 현재 디렉토리 경로를 갖고 있음

console.log(__dirname);  // /Users/siyo/React/node_project/hello
console.log(path.join(__dirname, 'public'));  // /Users/siyo/React/node_project/hello/public

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// url이 /guestbook으로 시작할 경우 guestRouter가 처리한다
app.use('/guestbook', guestRouter);
app.use('/ajax', ajaxRouter);
app.use('/grade', gradeRouter);

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
