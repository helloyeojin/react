var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();  //html연결.js

//bodyParse -- npm install bodyParser를 하고 해야함
//새 버전에서는 express가 갖고 있다
//post로 전송할 때 request.body에 보낸 정보를 추가해서
//사용이 간편하도록 도와주는 미들웨어이다
app.use(express.urlencoded({extended:false}));




app.get("/calcform", (request, response)=>{
  fs.readFile("../html/calcform.html", "utf-8", (err, data)=>{
    response.writeHead(200,{"content-type":"text/html"});
    response.end(ejs.render(data));
  })
});

app.get("/calc", (request, response)=>{
  let x = parseInt(request.query.x);
  let y = parseInt(request.query.y);
  let operator = parseInt(request.query.operator);

  if(operator == "1")
    response.send(`${x} + ${y} = ${x+y}`)
  else if(operator == "2")
    response.send(`${x} - ${y} = ${x-y}`)
  else if(operator == "3")
    response.send(`${x} * ${y} = ${x*y}`)
  else
    response.send(`${x} / ${y} = ${x/y}`)
});

app.use((request, response)=>{
  response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  response.end("<h1>url을 입력하세요</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})