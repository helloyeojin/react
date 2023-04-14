let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  
  let results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_list', { boardList:results });
});

router.get('/view/:id', async function (req, res, next) {
  let id = req.params.id;
  let sql = `
        select A.id, A.title, A.writer, A.contents, date_format(A.wdate, '%Y-%m-%d') wdate,
        (select username from tb_member B where A.writer = B.userid) username
        from tb_board A
        where id = ${id}
        `;
        /* subquery: select(결과셋이 하나 또는 0개일 때 가능), 
        from 인라인뷰, where절에서는 드물다(책은 여기만)
        조인 -> 서브쿼리(캐쉬가 됨) -> 함수 순으로 빠릅니다 조인이 제일 빠름
        nested loop join => for문 돌려서 조인을 한다 10이전 버전
        hash join => 양쪽 테이블의 join컬럼을 기준으로 해쉬테이블을 만들어 조인한다(엄청 빠름!)

        선형검색(n번 비교), 이진검색(데이터가 순서대로 있을 때), 해쉬검색(제일 빠름)
        */
  let results = await commonDB.mysqlRead(sql, []);
  if (results.length == 0) {
    res.json({result:"fail", msg:"해당하는 데이터를 찾을 수 없습니다."});
    return;
  }
  res.json({result:"success", msg:"", board:results[0]});
});

// http://localhost:9090/rest_board/list (x) 이거는 안됨
// http://localhost:9090/rest_board/list/1 (o) 이게 맞습니다
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
  let sql = `SELECT count(*) cnt FROM
  (
    SELECT A.id, A.title, A.writer, A.wdate,  @rownum:= @rownum+1 AS num
    FROM TB_BOARD A, (SELECT @rownum:=0) B
  ) A
  LEFT OUTER JOIN tb_member C ON A.writer=C.userid `;

  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql =`SELECT A.id, A.title, A.writer, A.num, A.username
  , date_format(A.wdate, '%Y-%m-%d') wdate 
FROM
(
  SELECT A.id, A.title, A.writer, A.wdate, c.username
  ,@rownum :=@rownum+1 num
  FROM tb_board A
  LEFT OUTER JOIN tb_member c ON a.writer=c.userid
  CROSS JOIN (SELECT @rownum:=0) B on 1=1
  ORDER BY id DESC
)A
ORDER BY id DESC
  LIMIT ${(pg-1)*10}, 10 `
  
    results = await commonDB.mysqlRead(sql, []);
    res.json({boardList:results, totalCnt:totalCnt, pg:pg});  // 응답완료
    // 한 함수 내에서 res.json 호출하고 또 다시 res.send나 render나 json을 호출할 수 없다
});

router.post("/write", async function(req, res, next) {
  // res.render('board/board_write.ejs');
  checkInfos=[
    {key:"title", type:"str", range:200},
    {key:"writer", type:"str", range:40},
    {key:"contents", type:"str", range:-1}
  ]
// 수행결과값이 0이면 문제 없는거고 다른 숫자가 온다면 오류임
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if(insertInfo["result"] != 0) {
    res.json(insertInfo);
    return;
  }
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  result = await commonDB.mysqlRead(sql, []);
  if (result[0]["cnt"]==0){
    res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
    return;
  }
  sql = `insert into tb_board(title, writer, contents, wdate)
        values('${title}', '${writer}', '${contents}', NOW())`;
  
  await commonDB.mysqlRead(sql, []);
  res.json({"result":"success"})
});

router.post("/save", async function(req, res, next) {
  try {
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;
    let params = [title, writer, contents];
    sql = `insert into tb_board(title, writer, contents, wdate)
          values(?,?,?,now())`;
    await commonDB.mysqlRead(sql, params);
    res.json({result:"success", msg:"등록성공"});
  } catch (e) {
    console.log(e);
    res.json({result:"fail", msg:"등록실패"});
  }
});



module.exports = router;
