var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended: false}));

app.get("/guguform", (req, res)=>{
  fs.readFile("../html/guguform.html", "utf-8", (err, data)=> {
    res.writeHead(200, {"content-type": "text/html"});
    res.end(ejs.render(data));
  })
});

app.get("/gugu", (req, res)=>{
  let dan = parseInt(req.query.dan);

  result = "";
  for (i=1; i<=9; i++){
    result += `${dan} * ${i} = ${dan*i}<br/>`
  }
  res.writeHead(200,{"content-type":"text/html"});
  res.end(result);
})

app.use((req, res)=>{
  res.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  res.end("<h1>url을 입력하세요</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})