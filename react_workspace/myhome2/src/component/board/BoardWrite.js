import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Outlet, Link, Navlink, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams();  // 보내는 쪽에서 json객체로 보냄
  let history = useNavigate();

  // const [title, setTitle] = useState("");
  // const [writer, setWriter] = useState("");
  // const [contents, setContents] = useState("");

  // 위에 거를 한방에 하려면 이렇게!
  // 변수 4개를 하나의 json 객체로 저장 => 필드가 많을 때 변수 하나씩 만들면 힘드니까
  const [inputs, setInputs] = useState({
    title:'', writer:'', contents:'', filename:''
  });

  // useEffect(()=>{
  //   console.log("id", id);
  //   async function loadData(id){
  //     let results = await axios.get(SERVERIP+"/rest_board/view/"+id);
  //     console.log(results.data.board.title);
  //     console.log(results.data.board.writer);
  //     console.log(results.data.board.contents);

  //     setTitle(results.data.board.title);
  //     setWriter(results.data.board.writer);
  //     setContents(results.data.board.contents);
  //   }
  //   if(id!=undefined)  //Write가 아니고 view로 호출할때
  //     loadData(id);
  //   // window.onload
  //   // BoardWrite 컴포넌트가 /board/write로 할 때는 undefined로 오고
  //   // /board/view/1로 하면 id에는 파라미터값이 저장된다
  // }, []);

  // 요거는 일일히 쓸 때 아래같이 쓰고
  // const titleChange=(e)=>{
  //   setTitle(e.target.value);
  // };
  // const writerChange=(e)=>{
  //   setWriter(e.target.value);
  // };
  // const contentsChange=(e)=>{
  //   setContents(e.target.value);
  // };

  // 모든 필드의 입력이벤트 처리를 여기서 함
  const onChange =(e)=>{
    const {value, name} = e.target;  // 입력 객체로부터 값과 이름을 가져온다
    console.log(value, name);
    setInputs({...inputs, [name]:value});  // {...inputs} - json 객체 복사
  }

  /*
  위 코드를 해석하면 아래처럼 나온다
  let temp = inputs;
  temp[name] = value;
  setINputs(temp);
  */

  // 서버로 전송하기
  const postData=()=>{
    // 데이터를 Json으로 묶어서 보내야 한다
    // let data = {"title": title, "writer": writer, "contents":contents};
    let frmData = new FormData();  // 파일을 전송할 때 반드시 이 객체로 보내야 함
    frmData.append("title", inputs.title);
    frmData.append("writer", inputs.writer);
    frmData.append("contents", inputs.contents);
    frmData.append("file", window.document.myform.file.files[0]);
    // 파일 첨부시 자바스크립트가 파일이 여러개 첨부하는 거로 처리한다.
    // 그래서 무조건 배열의 형태임! document.폼이름.file태그의name.files[0]; 이런 식으로 써야함
    // 여러개 추가할 수도 있음

    axios.post(SERVERIP+"/rest_board/save", frmData)
    .then((res)=>{
      console.log(res.data);
      history("/board/list");  // redirect랑 똑같은거~
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // json을 각각의 변수로 해체(destruction)
  const {title, writer, contents, file} = inputs;

  return (
    <div className="container">
      <form name="myform" encType="multipart/form-data">
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
                  <input type="text" className="form-control" value={title} name="title" placeholder="제목을 입력하세요" onChange={onChange}/>
                </div>
              </td>
            </tr>       
            <tr>
              <td style={{verticalAlign:"middle"}}>작성자</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={writer} name="writer" placeholder="작성자를 입력하세요" onChange={onChange}/>
                </div>
              </td>
            </tr>      
            <tr>
              <td style={{verticalAlign:"middle"}}>내용</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="text" className="form-control" value={contents} name="contents" placeholder="내용을 입력하세요" onChange={onChange}/>
                </div>
              </td>
            </tr>      
            <tr>
              <td style={{verticalAlign:"middle"}}>파일</td>
              <td>
                <div className="mb-3" style={{marginTop:"13px"}}>
                  <input type="file" className="form-control" value={file} name="file" placeholder="파일을 첨부하세요" onChange={onChange}/>
                </div>
              </td>
            </tr> 
          </tbody>
        </table>

        <div className="container mt-3" style={{textAlign:"right"}}>
          <Link className = "btn btn-info" onClick={postData}>등록</Link>&nbsp;&nbsp;
          <Link className = "btn btn-info">취소</Link>
        </div>
      </form>
    </div>
    )}


export default BoardWrite;