var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // js 파일끼리 같은 주소를 공유하지만 app.js에서 각 페이지가 어떤 url을 타고 들어가게 될지 지정해줄거라 괜찮음
  // res.render('guestbook/list');
  res.send("<h1>guestbook</h1>");
});

module.exports = router;
