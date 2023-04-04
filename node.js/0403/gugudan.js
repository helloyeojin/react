// http://127.0.0.1:4000/gugu?dan=4

var express = require("express")
var app = express();

app.get("/gugu", (req,res)=>{
  let dan = parseInt(req.query.dan);
  let table = [];
  for (let i=1; i<10; i++){
    table.push(`${dan} x ${i} = ${dan*i}<br>`)
  }
  res.writeHead(200,{"content-type":"text/html"});
  res.end(table.join(''));
  //table 배열이 문자열로 반환되지 않을 수 있으므로, table.join('')을 사용하여 배열 요소들을 하나의 문자열로 연결해야 함
})

app.use((request, response)=>{
  //다른 url처리 없을때 처리한다
  response.writeHead(200,{"content-type":"text/html"});
  response.end("<h1>EXPRESS</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})