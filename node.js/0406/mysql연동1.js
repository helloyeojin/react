var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306
});

// DB 연결하기
pool.getConnection((err, connection)=>{
  // 디비와 연결을 성공하면 매개변수로 전달된 함수가 호출된다.
  // err - 디비와 연결실패 시 처리
  if(err)
  {
    console.log(err);
    return;
  }

  // 연결 성공시 연결객체 connection을 전달한다
  // 연결 객체
  console.log("connection success");
  // sql = "select * from tb_board";
  sql = `select id, title, writer, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  connection.query(sql, (err, rows)=>{
    console.log(rows);
    connection.release();
  })
});
console.log("end");