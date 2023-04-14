import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link, useNavigate, useParams } from "react-router-dom";

function ScoreWrite(props) {
  let {id} = useParams();  // 보내는 쪽에서 json객체로 보냄
  let history = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [kor, setKor] = useState("");
  const [eng, setEng] = useState("");
  const [mat, setMat] = useState("");

  useEffect(()=>{
    console.log("id", id);
    async function loadData(id){
      let results = await axios.get(SERVERIP+"/score/view/"+id);
      console.log(results.data.score.STUDENT_NAME);
      console.log(results.data.score.KOR);
      console.log(results.data.score.ENG);
      console.log(results.data.score.MAT);

      setStudentName(results.data.score.STUDENT_NAME);
      setKor(results.data.score.KOR);
      setEng(results.data.score.ENG);
      setMat(results.data.score.MAT);
    }
    if(id!=undefined)  //Write가 아니고 view로 호출할때
      loadData(id);
    // window.onload
    // ScoreWrite 컴포넌트가 /score/write로 할 때는 undefined로 오고
    // /score/view/1로 하면 id에는 파라미터값이 저장된다
  }, []);

  const nameChange=(e)=>{
    setStudentName(e.target.value);
  };

  const korChange=(e)=>{
    setKor(e.target.value);
  };

  const engChange=(e)=>{
    setEng(e.target.value);
  };

  const matChange=(e)=>{
    setMat(e.target.value);
  };

  // 서버로 전송하기
  const postData=()=>{
    // 데이터를 Json으로 묶어서 보내야 한다
    let data = {"student_name": studentName, "kor": kor, "eng": eng, "mat": mat};
    axios.post(SERVERIP+"/score/write", data)
    .then((res)=>{
      console.log(res.data);
      history("/score/list");  // redirect랑 똑같은거~
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className="container">
      <h1>게시판 글쓰기</h1>
      <table className="table table-hover " style={{marginTop:"30px"}}>
        <colgroup>
          <col width="10%"/>
          <col width="*"/>
        </colgroup>
        <tbody>
          <tr>
            <td style={{verticalAlign:"middle"}}>제목</td>
            <td>
              <div className="mb-3" style={{marginTop:"13px"}}>
                <input type="text" className="form-control" value={studentName} placeholder="이름을 입력하세요" onChange={nameChange}/>
              </div>
            </td>
          </tr>       
            <tr>
              <td style={{verticalAlign:"middle"}}>국어</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={kor} placeholder="국어점수를 입력하세요" onChange={korChange}/>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{verticalAlign:"middle"}}>영어</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={eng} placeholder="영어성적을 입력하세요" onChange={engChange}/>
                </div>
              </td>
            </tr>      
            <tr>
              <td style={{verticalAlign:"middle"}}>수학</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={mat} placeholder="업적을 입력하세요" onChange={matChange}/>
                </div>
              </td>
            </tr>            
          </tbody>
        </table>

          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className = "btn btn-info" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className = "btn btn-info">취소</Link>
          </div>
    </div>
    )}


export default ScoreWrite;