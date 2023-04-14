import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams();  // 보내는 쪽에서 json객체로 보냄
  let history = useNavigate();

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [contents, setContents] = useState("");

  useEffect(()=>{
    console.log("id", id);
    async function loadData(id){
      let results = await axios.get(SERVERIP+"/rest_board/view/"+id);
      console.log(results.data.board.title);
      console.log(results.data.board.writer);
      console.log(results.data.board.contents);

      setTitle(results.data.board.title);
      setWriter(results.data.board.writer);
      setContents(results.data.board.contents);
    }
    if(id!=undefined)  //Write가 아니고 view로 호출할때
      loadData(id);
    // window.onload
    // BoardWrite 컴포넌트가 /board/write로 할 때는 undefined로 오고
    // /board/view/1로 하면 id에는 파라미터값이 저장된다
  }, []);

  const titleChange=(e)=>{
    setTitle(e.target.value);
  };
  const writerChange=(e)=>{
    setWriter(e.target.value);
  };
  const contentsChange=(e)=>{
    setContents(e.target.value);
  };


  // 서버로 전송하기
  const postData=()=>{
    // 데이터를 Json으로 묶어서 보내야 한다
    let data = {"title": title, "writer": writer, "contents":contents};
    axios.post(SERVERIP+"/rest_board/write", data)
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
                <input type="text" className="form-control" value={title} placeholder="제목을 입력하세요" onChange={titleChange}/>
              </div>
            </td>
          </tr>       
          <tr>
            <td style={{verticalAlign:"middle"}}>작성자</td>
            <td>
              <div className="mb-3" style={{marginTop:"13px"}}>
                <input type="text" className="form-control" value={writer} placeholder="작성자를 입력하세요" onChange={writerChange}/>
              </div>
            </td>
          </tr>      
          <tr>
            <td style={{verticalAlign:"middle"}}>내용</td>
            <td>
              <div className="mb-3" style={{marginTop:"13px"}}>
                <input type="text" className="form-control" value={contents} placeholder="내용을 입력하세요" onChange={contentsChange}/>
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