import React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom"

// 화면구성을 담당할 함수
function Layout(props) {

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/for1">for1</Link></li>
          <li><Link to="/for2">for2</Link></li>
          <li><Link to="/gugu">Gugudan</Link></li>
          </ul>
        </nav>  {/*메뉴8*/}
      <hr/>
      <Outlet/>
    </div>
  );
  
}

export default Layout;