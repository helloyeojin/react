var express = require("express");
var app = express(); // 서버 만들었음
var fs = require("fs");
var ejs = require("ejs");
//ejs엔진은 views폴더 아래서 파일을 검색한다.
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let boardList = [
    {id:1, title:"제목1", writer:"작성자1", wdate:"2023-04-04"},
    {id:2, title:"제목2", writer:"작성자2", wdate:"2023-04-05"},
    {id:3, title:"제목3", writer:"작성자3", wdate:"2023-04-06"},
    {id:4, title:"제목4", writer:"작성자4", wdate:"2023-04-07"},
    {id:5, title:"제목5", writer:"작성자5", wdate:"2023-04-08"}
];

app.use("/board/list", (request, response) => {
  response.render("board/board_list.ejs", {boardList:boardList});
});
app.use("/board/view/:id", (request, response) => {
  let id = request.params.id;
  let item = boardList.filter(x=>x.id==id);  //filter 메소드로 받아오면 배열로 받아오기 때문에
  response.render("board/board_view.ejs", {item:item[0]});  //item[0]을 써서 첫번째 값을 넣는거
});

//페이지만 이동한다 board_write.ejs로 이동만 함
app.use("/board/write", (request, response) => {
  let id = request.params.id;
  let item = boardList.filter(x=>x.id==id);  //filter 메소드로 받아오면 배열로 받아오기 때문에
  response.render("board/board_write.ejs");  //item[0]을 써서 첫번째 값을 넣는거
});


app.use("/board/save", (request, response) => {
  let title = request.body.title;
  let contents = request.body.contents;
  let writer = request.body.writer;
  let id = boardList.length+1;
  let date = new Date();
  let wdate = `${date.getFullYear()}-${String(date.getMonth()).padStart(2,'0')}-${String(date.getDate()).padStart(2, '0')}`;
  boardList.push({id:id, title:title, contents:contents, writer:writer, wdate:wdate});
  response.redirect("/board/list");
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});
app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});