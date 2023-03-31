let http = require("http");
http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end("<H1>Hello my first Webserver</H1>")
}).listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon