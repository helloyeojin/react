var express = require("express")
var app = express();
var ejs = require("ejs");
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let scoreData = [
  {id:1, name:"왕밤빵", kor:100, eng:50, mat:60}
];  // 데이터로 사용한다

// url은 서버 전체에서 유일해야 함 score/list
app.get("/score/list", (req, res)=>{
  // views/score/score_list.ejs
  // express framework를 사용할 때 이러한 디자인 파일들을 views 폴더에 넣기로 약속되어 있음
  // response 객체에 render라는 함수를 express가 추가해주는 것
  // 첫번째 매개변수 : html 파일
  // 두번쨰 매개변수 : 데이터를 JSON 형태로 전달해야 한다
  // 이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다 
  res.render("score/score_list.ejs", {scoreList:scoreData}); // 이거는 앞에가 키값, 뒤에가 내가 실제 넣는 데이터 이름
});

app.get("/score/view/:id", (req, res)=>{
  let id = req.params.id;
  // filter 조건을 만족하는 모든 데이터셋을 배열로 반환
  // find 함수는 조건을 만족하는 첫번째 데이터만 반환(배열 아님)
  let scoreItem = scoreData.find(score=>score.id==id);
  res.render("score/score_view.ejs", {score:scoreItem}); // 무조건 렌더를 마지막에 쓰세요 뒤에 다른 함수 붙으면 안됨
});

app.get("/score/write", (req, res)=>{
  res.render("score/score_write.ejs");
});

app.post("/score/save", (req, res)=>{
  let name = req.body.name;
  let kor = parseInt(req.body.kor);
  let eng = parseInt(req.body.eng);
  let mat = parseInt(req.body.mat);
  let id = scoreData.length+1;  //제일 마지막에 있는 데이터의 id+1을 해야함
  let sum = kor + eng + mat;
  let avg
  let data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
  scoreData.unshift(data);  // unshift 하면 배열 맨 앞에 새 데이터 추가, push하면 맨 아래 추가
  // redirect 함수를 이용해서 /score/list 호출
  res.redirect("/score/list");
});

app.use("/", (request, response)=>{
  //다른 url처리 없을때 처리한다
  response.render("index.ejs");
});

app.use((request, response)=>{
  //다른 url처리 없을때 처리한다(에러)
  response.writeHead(200,{"content-type":"text/html"});
  response.end("<h1>404 Error</h1>")
});

app.listen(4000, ()=>{
  console.log("server start http://127.0.0.1:4000");
})