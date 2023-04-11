import React, {useState} from "react";

// props 사용하던 말던 기본 매개변수로 사용하자
function Inputtest(props){
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  
  // 람다함수로 줘야함(일반함수로 주면 생성자에서 바인딩 작업을 해줘야 한다고 함)
  const nameChange=(e)=>{
    // 인자가 발생한 이벤트에 대한 모든 정보를 갖고 있음
    // console.log(e.target.value);  // 키를 누른 값이 저장되어 있다
    setName(e.target.value);  // name 변수의 값이 바뀐다
  }

  const ageChange=(e)=>{
    setAge(e.target.value);
  }

  const emailChange=(e)=>{
    setEmail(e.target.value);
  }

  let mystyle = {
    color: "white",
    backgroundColor: "skyblue",
    fontSize: "15pt",
    fontWeight: "800",
    padding: "5px 10px",
    border: "none"
  }
  return(
    <div>
      이름 : <input type = "text" onChange={nameChange} style={{color: "white", fontWeight: "800", backgroundColor: "skyblue", fontSize: "15pt", padding: "5px 10px", border: "none"}}/><br/>
      나이 : <input type = "text" style = {mystyle} onChange={ageChange}/><br/>
      이메일 : <input type = "text" style = {mystyle} onChange={emailChange}/><br/>
      <p>{name} {age} {email}</p>
    </div>
  )
}

export default Inputtest;