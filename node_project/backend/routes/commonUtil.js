//routes 폴더에 놓을것 commonUtil.js
function getPaging(pg, totalCnt, pageGroupSize = 10) {
  /*
    1  2  3  4  5  6  7  8  9 10  1~10 [0~9]  그룹번호 1
    11 12 13 14 15 16 17 18 19 20  11~20 [10~19] 그룹번호 2
    21 22 23 24 25 26 27 28 29 30  21~30 [20~29] 그룹번호 3
    전체페이지 갯수, 어느 그룹에 속하는지 확인해야한다.
  */
  pnTotal = Math.ceil(totalCnt / 10); // 한페이지당 데이터가 10건일때 15건이면 2페이지가 나오게해야됨
  pageGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize + 1;
  pageGroupEnd = pageGroupStart + 10;
  if (pageGroupEnd > pnTotal) {
    pageGroupEnd = pnTotal + 1;
  }
  console.log(pg, pageGroupStart, pageGroupEnd);
  return { pnTotal: pnTotal, pnStart: pageGroupStart, pnEnd: pageGroupEnd, pg:pg};
}
// for (i = 1; i < 32; i++) {
//   getPaging(i, 320);
// }

function checkInfo(req, checkInfos) {
  msg="";
  result=0;
  resultInfo={};

  for(info of checkInfos){
    // undefined -> 상대쪽에서 이 키값을 아예 안 보냈다는 의미
    if(req.body[info.key]==undefined) {
      msg = info.key + " is empty";
      result = 1;
      req.body[info.key]="";  // 다음 처리를 위해서 - 가급적 else를 사용하지 않기 위해
    }
    // 타입체크나 범위체크
    if(info.type == "str" && info.range != -1 && req.body[info.key].length > info.range) {
      result = 1;
      msg += info.key + " range error";
    }

    resultInfo[info.key] = req.body[info.key];
    resultInfo["result"] = result;
    resultInfo["msg"] =  msg;

    return resultInfo;
  }
}

exports.getPaging = getPaging;
exports.checkInfo = checkInfo;