import logo from './logo.svg';
import './App.css';
import HelloComponent from './component/HelloComponent';
import Iftest1 from './component/Iftest1';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Hero from './component/Hero';
import Gugudan from './component/Gugudan';
import HeroList from './component/HeroList';
import HeroWrite from './component/HeroWrite';


function App() {
  return (
    <div className="App">
      {/* 그냥 있는 css 파일 가져다 쓸 때는 className을 쓰고
      우리가 여기서 스타일 정의해서 쓸 때는 그냥 style이라고 쓰면 됨 */}
      <h1 className="title">제목제목</h1>
      {/* <Iftest1/> */}
      {/* <Fortest1/> */}
      {/* <Fortest2/> */}
      {/* <Hero/> */}
      {/* <Gugudan/> */}
      <HeroWrite/>
      <HeroList/>
    </div>
  );
}

export default App;
