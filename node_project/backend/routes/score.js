var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
  let sql=`
  SELECT A.id, A.student_name, A.kor, A.eng, A.mat, DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate
  FROM tb_score A`
  let results = await commonDB.mysqlRead(sql,[]);
  res.json(results);
});

router.post('/write', async function(req, res, next){
  let student_name = req.body.student_name;
  let kor = req.body.kor;
  let eng = req.body.eng;
  let mat = req.body.mat;
  sql = `
  INSERT INTO tb_score(student_name, kor, eng, mat, wdate)
  VALUES (?, ?, ?, ?, NOW())
  `;

  try {
    let result = await commonDB.mysqlRead(sql, [student_name, kor, eng, mat]);
    console.log(kor, eng, mat);
    res.json({"result":"success"});
  } catch(e) {
    console.log(e);
    res.json({"result":"fail"});
  }
})

router.get('/view/:id', async function(req, res, next){
  try {
    let id = req.params.id;
    let sql = `SELECT * FROM tb_score WHERE id=${id}`;
    let results = await commonDB.mysqlRead(sql,[]);
    res.json({"result":"success", "score":results[0]});
  } catch(e) {
    console.log(e);
    res.json({"result":"fail"});
  }
})


module.exports = router;
