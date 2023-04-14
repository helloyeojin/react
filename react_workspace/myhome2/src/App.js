import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Layout from './layout/Layout.js';
import Home from './component/Home.js';
import HeroList from './component/hero/HeroList.js';
import HeroWrite from './component/hero/HeroWrite.js';
import BoardList from './component/board/BoardList.js';
import BoardWrite from './component/board/BoardWrite.js';
import ScoreList from './component/score/ScoreList';
import ScoreWrite from './component/score/ScoreWrite';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/hero/list" element={<HeroList/>}/>
          <Route path="/hero/write" element={<HeroWrite/>}/>
          <Route path="/hero/view/:id" element={<HeroWrite/>}/>
          <Route path="/board/list" element={<BoardList/>}/>
          <Route path="/board/write" element={<BoardWrite/>}/>
          <Route path="/board/view/:id" element={<BoardWrite/>}/>
          <Route path="/score/list" element={<ScoreList/>}/>
          <Route path="/score/view/:id" element={<ScoreWrite/>}/>
          <Route path="/score/write" element={<ScoreWrite/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
