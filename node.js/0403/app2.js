var express = require("express")
var app = express();

http://127.0.0.1:4000/add?x=45&y=7
app.get("/add", (req,res)=>{
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);
  let z = x+y;
  res.send(`${x} + ${y} = ${z}`);
})

//http://127.0.0.1:4000/add/45/7
app.get("/add/:x/:y", (req, res)=>{
  console.log(req.params);  //name;
  let add={
    x:parseInt(req.params.x), 
    y:parseInt(req.params.y)
  };
  res.send(`${add.x} + ${add.y} = ${add.x+add.y}`);  //Send 함수를 이용해서 JSON 데이터 송신
});

app.use((request, response)=>{
  //다른 url처리 없을때 처리한다
  response.writeHead(200,{"content-type":"text/html"});
  response.end("<h1>EXPRESS</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})