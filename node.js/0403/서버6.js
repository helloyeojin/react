let http = require("http");
let fs = require("fs");

let server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    
    fs.readFile("../html/index.html", (error, data)=>{
        if (error)
        {
            response.writeHead(500, {'Content-Type':'text/html;charset=utf-8'});
            response.end("error"); //오류상황임
            return;
        }
        
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(data); //파일내용을 브라우저로 보낸다
    })
})

server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon