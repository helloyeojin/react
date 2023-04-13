import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams();  // 보내는 쪽에서 json객체로 보냄
  let history = useNavigate();

  const [heroName, setHeroName] = useState("");
  const [heroDesc, setHeroDesc] = useState("");

  useEffect(()=>{
    console.log("id", id);
    async function loadData(id){
      let results = await axios.get(SERVERIP+"/hero/view/"+id);
      console.log(results.data.hero.hero_name);
      console.log(results.data.hero.hero_desc);

      setHeroName(results.data.hero.hero_name);
      setHeroDesc(results.data.hero.hero_desc);
    }
    if(id!=undefined)  //Write가 아니고 view로 호출할때
      loadData(id);
    // window.onload
    // BoardWrite 컴포넌트가 /board/write로 할 때는 undefined로 오고
    // /board/view/1로 하면 id에는 파라미터값이 저장된다
  }, []);

  const nameChange=(e)=>{
    setHeroName(e.target.value);
  };

  const descChange=(e)=>{
    setHeroDesc(e.target.value);
  };

  // 서버로 전송하기
  const postData=()=>{
    // 데이터를 Json으로 묶어서 보내야 한다
    let data = {"hero_name": heroName, "hero_desc": heroDesc};
    axios.post(SERVERIP+"/hero/write", data)
    .then((res)=>{
      console.log(res.data);
      history("/board/list");  // redirect랑 똑같은거~
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
                <input type="text" className="form-control" value={heroName} placeholder="이름을 입력하세요" onChange={nameChange}/>
              </div>
            </td>
          </tr>       
            <tr>
              <td style={{verticalAlign:"middle"}}>작성자</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={heroDesc}placeholder="업적을 입력하세요" onChange={descChange}/>
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


export default BoardWrite;