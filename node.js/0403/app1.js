var express = require("express")
var app = express();

//express 모듈 자체가 Use, get, post 함수 3개가 있음
//use - get, post가 오던 상관없이 처리가 이뤄진다
//Get - get 방식으로 온 것만
//Post - post 방식으로 온 것만 처리

app.use("/test", (request, response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Test</h1>");
});

//다른 url 처리 없을 때 처리한다
app.get("/get", (request, response)=>{
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>GET</h1>");
});

app.get("/userinfo", (req, res)=>{
  let userinfo={name:"Harry", "phone":"01020170820"};
  res.send(userinfo);  //Send 함수를 이용해서 JSON 데이터 송신
});

//userinfo2?name=Jane&phone=01000000000
app.get("/userinfo2", (req, res)=>{
  //req.params.name;
  let userinfo={name:req.query.name, "phone":req.query.phone};
  res.send(userinfo);  //Send 함수를 이용해서 JSON 데이터 송신
});

// get방식 - 새롭게 추가된 url 방식
// userinfo3/uhmango/user01
app.get("/userinfo3/:username/:userid", (req, res)=>{
  console.log(req.params);  //name;
  let userinfo={
    username:req.params.username, 
    userid:req.params.userid
  };
  res.send(userinfo);  //Send 함수를 이용해서 JSON 데이터 송신
});

app.post("/post", (request, response)=>{
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>POST</h1>");
});

app.use((request, response)=>{
  //다른 url처리 없을때 처리한다
  response.writeHead(200,{"content-type":"text/html"});
  response.end("<h1>EXPRESS</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})