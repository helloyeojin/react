import React, {useState} from "react";

function Grade(){
  const [name, setName]=React.useState("");
  const [kor, setKor]=React.useState(0);
  const [eng, setEng]=React.useState(0);
  const [mat, setMat]=React.useState(0);
  const [sum, setSum]=React.useState(0);
  const [avg, setAvg]=React.useState(0);
  const [resultString, setResultString]=React.useState("");


  function nameChange(e) {
    setName(e.target.value);          
  };

  function korChange(e) {
    setKor(parseInt(e.target.value));
  };
  
  function engChange(e) {
    setEng(parseInt(e.target.value));
  };

  function matChange(e) {
    setMat(parseInt(e.target.value));
  };

  const result = ()=>{
    setSum(kor+eng+mat);
    setAvg(((kor+eng+mat)/3).toFixed(2));
    setResultString(`${name}의 총점은 ${sum}이고 평균은 ${avg}입니다.`);
  }

  let inputStyle = {
    color: "#000",
    backgroundColor: "lemonchiffon",
    fontSize: "11pt",
    fontWeight: "600",
    padding: "5px 7px",
    marginBottom: "5px",
    border: "lightgray 0.7px solid"
  }

  return(
    <div>
      이름 : <input type="text" style={inputStyle} onChange={nameChange}/><br/>
      국어 : <input type="text" style={inputStyle} onChange={korChange}/><br/>
      영어 : <input type="text" style={inputStyle} onChange={engChange}/><br/>
      수학 : <input type="text" style={inputStyle} onChange={matChange}/><br/><br/>
      <button type="button" onClick={result}>결과 확인</button><br/><br/>
      <div>{resultString}</div>
    </div>
  )
}

export default Grade;