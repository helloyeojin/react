import React, {useState} from "react";

function Counter(){
  const [x, setX]=React.useState(0);
  const [y, setY]=React.useState(0);
  const [z, setZ]=React.useState(0);

  function xChange(e) {
    setX(e.target.value);          
  };

  function yChange(e) {
    setY(e.target.value);
  };

  const add = ()=>{
    setZ(parseInt(x)+parseInt(y));
  }

  const sub = ()=>{
    setZ(parseInt(x)-parseInt(y));
  }

  return(
    <div>
      x : <input type="text" style={{padding: "5px 7px 5px 7px", marginBottom: "5px", backgroundColor: "lemonchiffon"}} onChange={xChange}/><br/>
      y : <input type="text" style={{padding: "5px 7px 5px 7px", backgroundColor: "lemonchiffon"}} onChange={yChange}/><br/>
      <h1>{z}</h1>
      <button type="button" style={{marginRight:"3px"}} onClick={add}>+</button>
      <button type="button" onClick={sub}>-</button>
    </div>
  )
}

export default Counter;