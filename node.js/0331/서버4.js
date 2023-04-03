let http = require("http");
let fs = require("fs");  //파일읽기
let url = require("url"); //url분석을 위한 라이블러

// http://127.0.0.1:4000/add?x=4&y=5  이렇게 보내보겠읍니다
// http://127.0.0.1:4000/sub?x=4&y=5
// http://127.0.0.1:4000/userinfo?userid=test&username=Tom 
let server = http.createServer((request, response)=> {
  //console.log(request);
  //console.log(request.url);  //전송Url
  console.log(request.method);  //전송방식

  let rurl = request.url;
  let pathname = url.parse(rurl, true).pathname;  //add
  let query = url.parse(rurl, true).query;  //{x:4, y:5} 이렇게 JSON 식으로 옴
  //string 분석 -> json객체로 전환
  //파싱한다(parse) = 헤더값으로부터 원하는 키값을 추출해낼 떄 사용함! 
  console.log(query);
  console.log(pathname);
  console.log(typeof(query));
  
  if(pathname=="/add")
  {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    let x = parseInt(query.x);
    let y = parseInt(query.y);
    let z = x+y;
    response.end(`${x} + ${y} = ${z}`);  //저기 위에 Utf 8 안 쓴 상태로 한글 쓰면 깨집니다
  }
  else if(pathname=="/sub")
  {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    let x = parseInt(query.x);
    let y = parseInt(query.y);
    let z = x-y;
    response.end(`${x} - ${y} = ${z}`);  //저기 위에 Utf 8 안 쓴 상태로 한글 쓰면 깨집니다
  }
  else if(pathname=="/userinfo")
  {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    let id = query.userid;
    let name = query.username;
    response.end(`userinfo - id: ${id} // name: ${name}`);  //저기 위에 Utf 8 안 쓴 상태로 한글 쓰면 깨집니다
  }
  else
  {
    response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
    response.end("<h1>존재하지 않는 url입니다.</h1>");
  }
})


server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon