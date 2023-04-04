//http://127.0.0.1:4000/gugu?dan=4

var express = require("express")
var app = express();

app.get("/gugu", (req,res)=>{
  let dan = parseInt(req.query.dan);
  let result="";
  for(i=1;i<=9;i++)
  {
    result += `${dan} * ${i} = ${dan*i}<br/>`;
  }
  res.writeHead(200,{"content-type":"text/html"});
  res.end(result);
  //res.end("hello"); 이렇게 하면 이미 데이터 보내기를 완료했기 때문에 오류가 발생하게 됨
})

//http://127.0.0.1:4000/gugu/4
app.get("/gugu/:dan", (req,res)=>{
  let dan = req.params.dan;
  let result="";
  for(i=1;i<=9;i++)
  {
    result += `${dan} * ${i} = ${dan*i}<br/>`;
  }
  res.writeHead(200,{"content-type":"text/html"});
  res.end(result);
  //res.end("hello"); 이렇게 하면 이미 데이터 보내기를 완료했기 때문에 오류가 발생하게 됨
})

app.use((request, response)=>{
  //다른 url처리 없을때 처리한다
  response.writeHead(200,{"content-type":"text/html"});
  response.end("<h1>EXPRESS</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})