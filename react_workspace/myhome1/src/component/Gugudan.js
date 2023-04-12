import React, { useState } from "react";

function Gugudan(props) {
  const [dan, setDan] = useState("");
  const [num] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const [flag, setFlag] = useState(false);

  const danChange = (e) => {
    setFlag(false); // 단 입력할때 출력됐던 구구단 삭제
    setDan(e.target.value);
  };

  const changeFlag = () => {
    setFlag(true);
  };

  return (
    <div>
      몇 단? : <input type="text" onChange={danChange}></input>
      <button type="button" onClick={changeFlag}>
        구구단을외자구구단을외자
      </button>
      <br />
      <div>
        {flag
          ? num.map((num, index) => {
              return (
                <li key={index}>
                  {dan} X {num} = {num * dan}
                </li>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Gugudan;












