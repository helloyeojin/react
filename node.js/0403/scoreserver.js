let http = require("http");
let fs = require("fs");
let ejs = require("ejs");  //npm install ejs

let scoreData = [
  {name:"왕밤빵", kor:90, eng:90, mat:100},
  {name:"장덕배", kor:80, eng:60, mat:80},
  {name:"신리오", kor:70, eng:100, mat:80},
  {name:"어망고", kor:60, eng:70, mat:90},
  {name:"어키위", kor:100, eng:100, mat:100}
];

let server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    
    fs.readFile("../html/score.html", "utf-8", (error, data)=>{
        if (error)
        {
            response.writeHead(500, {'Content-Type':'text/html;charset=utf-8'});
            response.end("error"); //오류상황임
            return;
        }
        
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
          scoreData:scoreData
        })); 
    })
})

server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); 