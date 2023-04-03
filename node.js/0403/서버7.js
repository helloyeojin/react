let http = require("http");
let fs = require("fs");
let ejs = require("ejs");  //npm install ejs

let server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    
    fs.readFile("../html/test.html", "utf-8", (error, data)=>{
        if (error)
        {
            response.writeHead(500, {'Content-Type':'text/html;charset=utf-8'});
            response.end("error"); //오류상황임
            return;
        }
        
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
          "name":"왕밤빵",
          age:6,
          address:"인천 미추홀구",
          limit:10
        })); //파일내용을 브라우저로 보낸다
        // ejs 템플릿 엔진을 통해서 htmlrhk node.js의 데이터를 결합한다
    })
})

server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon