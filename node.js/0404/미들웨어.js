var express = require("express")
var app = express();


//첫번쨰 미들웨어
app.use((request, response, next) => {
  //request 브라우저 -> 서버
  //response 서버 -> 브라우저
  //next - 다음 함수를 호출한다
  request.name="왕밤빵";
  response.name="marron";
  console.log("aaaaaaa");
  next();
});

//두번째 미들웨어
app.use((request, response, next)=>{
  console.log("bbb");
  request.phone="01020170820";
  response.address="인천 미추홀구";
  next();
})
app.use((request, response)=>{
  //다른 url처리 없을때 처리한다
  response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
  console.log(request.name);
  console.log(response.name);
  console.log(request.phone);
  console.log(response.address);

  response.end("<h1>EXPRESS</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})