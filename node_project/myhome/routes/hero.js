var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
  let sql=`
  SELECT A.id, A.hero_name, A.hero_desc, DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate
  FROM tb_hero A`
  let results = await commonDB.mysqlRead(sql,[]);
  res.json(results);
//   res.json(
//     [
//       {id:1, name:"왕밤빵", descr:"우리집고양이임"},
//       {id:2, name:"장덕배", descr:"귀여움"},
//       {id:3, name:"애플망고", descr:"맛있음"},
//       {id:4, name:"자두", descr:"진짜맛있음"}
//     ]
// )
});

router.post('/write', async function(req, res, next){
  let hero_name = req.body.hero_name;
  let hero_desc = req.body.hero_desc;
  sql = `
  INSERT INTO tb_hero(hero_name, hero_desc, wdate)
  VALUES (?, ?, NOW())
  `;

  try {
    let result = await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
    console.log(hero_desc);
    res.json({"result":"success"});
  } catch(e) {
    console.log(e);
    res.json({"result":"fail"});
  }
})
module.exports = router;
