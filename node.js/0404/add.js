var express = require("express");
var fs = require("fs");
var ejs = require("ejs");
var app = express();  //html연결.js

app.use(express.urlencoded({extended:false}));

app.get("/addform", (request, response)=>{
  fs.readFile("../html/addform.html", "utf-8", (err, data)=>{
    response.writeHead(200,{"content-type":"text/html"});
    response.end(ejs.render(data));
  })
});

app.get("/add", (request, response)=>{
  let x = parseInt(request.query.x); //input 태그의 name 속성
  //id는 그냥 코딩하는 선에서 쓰는거고 html에는 무조건 name 값이 전달됨
  let y = parseInt(request.query.y);

  response.send(`${x} + ${y} = ${x+y}`)
});

app.use((request, response)=>{
  response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  response.end("<h1>url을 입력하세요</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})