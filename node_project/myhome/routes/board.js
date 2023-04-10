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
        select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
        from tb_board where id = ${id}
        `;
  let results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_view', { board: results });
});

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
ORDER BY id ASC
  LIMIT ${(pg-1)*10}, 10 `
  
    results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', {
      session: req.session,
      boardList: results,
      totalCnt: totalCnt,
      pg:pg,
      paging:commonUtil.getPaging(pg, totalCnt)
    });
});

router.get("/write", async function(req, res, next) {
  res.render('board/board_write.ejs');
});

router.post("/save", async function(req, res, next) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `insert into tb_board (title, writer, contents, wdate) values (${title}, ${writer}, ${contents}, NOW())`;
  let result = await commonDB.mysqlRead(sql);
  res.redirect("/board");
});



module.exports = router;
