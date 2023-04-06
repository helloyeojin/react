let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  
  let results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_list', { boardList:results });
});

router.use('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id =${id}`;
  
  let item = await commonDB.mysqlRead(sql, []);
  res.render('board/board_view.ejs', {boardList:item});
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
