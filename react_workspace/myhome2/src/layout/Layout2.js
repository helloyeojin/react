import 'bootstrap/dist/css/bootstrap.min.css';
// 부트스트랩 라이브러리

import {Outlet, Link, NavLink} from 'react-router-dom';

function Layout(){
  return(
    <div>
      <nav className="navbar navbar-expand-sm bg-info navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">Home</NavLink>
              {/* anchor태그 말고 NavLink를 사용하자! a 태그 쓰면 페이지 전체가 새로고침됩니다 */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list">게시판</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{marginTop:"20px"}}/>
      <Outlet/> {/*이게 출력되는 위치임*/}
    </div>
  )
}

export default Layout;