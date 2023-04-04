var express = require('express');
var app = express();
var path = require("path");

console.log( __dirname);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var ejs = require("ejs");
const {title} = require('process');
const {writer} = require('repl');
app.use(express.urlencoded({extended: false}));

var guestbookList = [
  {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"},
  {"id":1, "title":"제목2", "writer":"작성자2", "contents":"내용2", "wdate":"2023-04-05"},
  {"id":1, "title":"제목3", "writer":"작성자3", "contents":"내용3", "wdate":"2023-04-06"},
  {"id":1, "title":"제목4", "writer":"작성자4", "contents":"내용4", "wdate":"2023-04-07"},
  {"id":1, "title":"제목5", "writer":"작성자5", "contents":"내용5", "wdate":"2023-04-08"},
];

app.get("/list", function(request, response){
  response.render('guestbook/list', {"title":"게시판목록", "guestbookList":guestbookList});
});

app.get("/view/:id", function(request, response){
  var id = parseInt(request.params.id)-1;
  response.render('guestbook/view', {"title":"게시판상세화면", "guestbook":guestbookList[id]});
});

app.get("/write", (req, res)=>{
  res.render('guestbook/write');
});

app.post("/write", (req, res)=>{
  console.log(req.body);
  var title = req.body.title;
  var writer = req.body.writer;
  var contents = req.body.contents;
  var wdate = req.body.wdate;
  var id = guestbookList.length+1;

  guestbookList.push({title:title, contents:contents, writer:writer, wdate:wdate, id:id});
  res.redirect("/list");
});

  app.listen(4000, function () {
    console.log('server start http://127.0.0.1:4000');
  });