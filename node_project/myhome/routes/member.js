var express = require('express');
var router = express.Router();
let commonDB = require("./commonDB");  // . 하나 찍혀있으면 현재 이 파일이 있는 폴더에 같이 있단 뜻

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', { title: 'Express' });
});

// 아이디 중복체크 -- 클라이언트로부터 아이디를 받는다
//                    받아온 아이디를 디비에 가서 존재하는지 유무 확인
//                    존재하면 fail을 사용자에게 보내주고, 존재하지 않아서 사용가능하면 success 반환
router.use('/idcheck', async function(req, res, next){
  let userid = req.body.userid; // 사용자단에서 userid
  sql = `select count(*) cnt from tb_member where userid='${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if(cnt==0)
    res.json({"result":"success"});
  else
    res.json({"result":"fail"})
});

// /member/save
router.use('/save', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;
  let sql = `insert into tb_member (userid, password, username, email, phone, zipcode, address1, address2, nickname, wdate) values(?,?,?,?,?,?,?,?,?, now())`;

  try
  {
    await commonDB.mysqlRead(sql, [userid, password, username, email, phone, zipcode, address1, address2, nickname]);
    res.json({"result":"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
});

// /member/login
router.get('/login', async function(req, res, next){
  res.render("member/member_login");
}); 

router.use('/logon', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select count(*) cnt from tb_member where userid='${userid}' and password='${password}'`;

  let rows = await commonDB.mysqlRead(sql, [userid, password]);
  let cnt = rows[0]["cnt"];
  if(cnt == 1)
    res.json({"result":"success"});
  else
    res.json({"result":"fail"})
});

router.get('/put', async function(req, res, next){
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session);
}); 

module.exports = router;
