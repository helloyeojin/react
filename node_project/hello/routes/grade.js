var express = require('express');
var router = express.Router();

router.use('/gradeform', function(req, res, next) {
  res.render("grade/gradeform");
});

router.use('/calc', function(req, res, next) {  
  name = req.query.name;
  kor = parseInt(req.query.kor);
  eng = parseInt(req.query.eng);
  mat = parseInt(req.query.mat);
  sum = kor + eng + mat;
  avg = sum/3;

  res.json({sum:sum, avg:avg});
})

module.exports = router;