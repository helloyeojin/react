var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();
app.use(express.urlencoded({extended:false}));

app.get("/gradeform", (req, res)=>{
  fs.readFile("../html/gradeform.html", "utf-8", (err, data)=>{
    res.writeHead(200, {"content-type": "text/html"});
    res.end(ejs.render(data));
  })
});

app.get("/grade", (req, res)=>{
  let name = req.query.name;
  let kor = parseInt(req.query.kor);
  let eng = parseInt(req.query.eng);
  let mat = parseInt(req.query.mat);

  result = `${name}의 총점은 ${kor+eng+mat}이고 평균은 ${((kor+eng+mat)/3).toFixed(2)}입니다.`;
  res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
  res.end(result);
})

app.use((req, res)=>{
  res.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  res.end("<h1>url을 입력하세요</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})