import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../../Page.css";

function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pg, setPg] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const loadData = async(pg)=> {
    const url = SERVERIP + "/rest_board/list/"+pg;
    await axios
      .get(url)
      .then((res) => {
        let totalCnt = res.data.totalCnt;
        let pg = res.data.pg;
        let boardList = res.data.boardList;
        console.log("데이터 전체 개수 :", totalCnt);
        console.log("현재 페이지 :", pg);
        console.log("데이터 :", boardList);

        setTotalCnt(totalCnt);
        setPg(pg);
        setBoardList(boardList);
        setLoading(true);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const goPage = (pg)=>{
    setPg(pg);
    loadData(pg);
  }

  useEffect(() => {
    loadData(1);
  }, []);

  return (
    <div className="container">
      <h1>게시판 목록</h1>
      <div className="input-group mb-3" style={{ marginTop: "2vh" }}>
        <button
          type="button"
          className="btn btn-outline-info dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          선택하세요
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              제목
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              내용
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              제목+내용
            </a>
          </li>
        </ul>
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-info" type="submit">
          Go
        </button>
      </div>
      <table className="table table-hover ">
        <colgroup>
          <col width="8%"></col>
          <col width="*"></col>
          <col width="14%"></col>
          <col width="14%"></col>
          <col width="37%"></col>
        </colgroup>
        <thead className="table-secondary">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>첨부파일</th>
          </tr>
        </thead>
        <tbody>
          {
            loading===true?
            boardList.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.id}</td>
                  <td><Link to={"/board/view/"+item.id}>{item.title}</Link></td>
                  <td>{item.username}</td>
                  <td>{item.wdate}</td>
                  <td>
                    {
                      item.filelink!=null?
                      <img src = {`http://127.0.0.1:9090/${item.filelink}`} height="200px" crossorigin="anonymous"></img>
                      :""
                    }
                  </td>
                </tr>
              )
            })
            :""
          }
        </tbody>
      </table>

      <Pagination 
        activePage={pg}  // 현재 실행 중인 페이지
        itemsCountPerPage={10}  // 한 페이지당 보여줄 라인 수
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={goPage}
        firstPageText={"<<"}
        lastPageText={">>"}
      />
      <div>
        <Link className="btn btn-outline-info" to="/board/write" style={{float:"right"}}>글쓰기</Link>
      </div>
    </div>
  );
}

export default BoardList;