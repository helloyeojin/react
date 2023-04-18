let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
// npm install multer : nodejs에서 파일 업로드를 담당
// 파일을 DB에 저장할 수는 있지만, 현업에서는 일반적으로 폴더에 별도 저장하고 DB에는 파일명만 저장
// 백엔드 서버에 저장하고, 프론트에는 링크만 전달

let multer = require("multer");
let path = require("path"); //파일이나 디스크 관리 모듈. 주로 경로 
// 파일을 업로드하는데 필요한 정보를 설정해야 한다
let storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null,"uploads/board"); 
    // 파일 업로드 경로 지정
    // cb : 파일 업로드시 이 함수 호출
  },
  filename:function(req, file, cb){
    // new Date : 현재 날짜와 시간, 분초꺼지 알아온다 -> valueOF() : 문자열로 변경
    // 본래 파일명이 중복될 가능성이 있어서 별도의 파일명 부여
    // 확장자는 본래 파일명으로 해야 한다
    // path.extname(파일명) : 파일의 확장자를 가져온다
    // 두번째 인자인 file이 업로드되는 파일인데 이 파일의 originalfilename에 원래 파일명이 있다.
    let newFilename = new Date().valueOf() + path.extname(file.originalname);
    cb(null, newFilename);
  }
});

//제한
const limits = {
  fieldNameSize: 200, //필드명 사이즈 최대값
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 20*1024*1024, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "20MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

//확장자 필터
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(null, false);
  }
};

let upload = multer({storage:storage,
  // limits:limits, // 업로드 제한
  // fileFilter:fileFilter // 파일 확장자 제한
});

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
  , date_format(A.wdate, '%Y-%m-%d') wdate, A.filename, A.filelink 
FROM
(
  SELECT A.id, A.title, A.writer, A.wdate, c.username, A.filename, A.filelink
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



// upload.single("file") - 파일 업로드 부분만 중간에 따로 처리한다
// upload.single(폼태그에서 file 속성의 name이 file임)
// <input type="file" name = "file" /> 이때 name 속성값
// 파일 전송시 form 태그에 enctype = "form-data/multifpart" 속성이 반드시 있어야함
// ejs나 jsp 같은 데서 사용

// ajax로 전송할 때는 FormData라는 객체를 이용해서 보내야함
// $.ajax나 axios 모던스크립트 fetch라는 ajax 모듈이 추가되었음
router.post("/save", upload.single("file"), async function(req, res, next) {
  checkInfos=[
    {key:"title", type:"str", range:200},
    {key:"writer", type:"str", range:40},
    {key:"contents", type:"str", range:-1}
  ];

  let file = req.file; //파일 경로는 body로 보내지 않는다
  console.log(file.originalname); //원래 이름
  console.log(file.filename); //부여한 이름

// 수행결과값이 0이면 문제 없는거고 다른 숫자가 온다면 오류임
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if(insertInfo["result"] != 0) {
    res.json(insertInfo);
    return;
  }
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let filename = file.filename;
  let filelink = "uploads/board/"+filename;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  result = await commonDB.mysqlRead(sql, []);
  if (result[0]["cnt"]==0){
    res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
    return;
  }
  sql = `insert into tb_board(title, writer, contents, wdate, filename, filelink)
        values('${title}', '${writer}', '${contents}', NOW(),
        '${filename}', '${filelink}')`;
  
  await commonDB.mysqlRead(sql, []);
  res.json({"result":"success"})
});



// router.post("/write", async function(req, res, next) {
//   // res.render('board/board_write.ejs');
//   checkInfos=[
//     {key:"title", type:"str", range:200},
//     {key:"writer", type:"str", range:40},
//     {key:"contents", type:"str", range:-1}
//   ]
// // 수행결과값이 0이면 문제 없는거고 다른 숫자가 온다면 오류임
//   insertInfo = commonUtil.checkInfo(req, checkInfos);
//   if(insertInfo["result"] != 0) {
//     res.json(insertInfo);
//     return;
//   }
//   let title = req.body.title;
//   let writer = req.body.writer;
//   let contents = req.body.contents;

//   let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
//   result = await commonDB.mysqlRead(sql, []);
//   if (result[0]["cnt"]==0){
//     res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
//     return;
//   }
//   sql = `insert into tb_board(title, writer, contents, wdate)
//         values('${title}', '${writer}', '${contents}', NOW())`;
  
//   await commonDB.mysqlRead(sql, []);
//   res.json({"result":"success"})
// });

// router.post("/save", async function(req, res, next) {
//   try {
//     let title = req.body.title;
//     let writer = req.body.writer;
//     let contents = req.body.contents;
//     let params = [title, writer, contents];
//     sql = `insert into tb_board(title, writer, contents, wdate)
//           values(?,?,?,now())`;
//     await commonDB.mysqlRead(sql, params);
//     res.json({result:"success", msg:"등록성공"});
//   } catch (e) {
//     console.log(e);
//     res.json({result:"fail", msg:"등록실패"});
//   }
// });



module.exports = router;
