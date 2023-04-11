import logo from './logo.svg';
import './App.css';
import HelloComponent from './component/HelloComponent';


function App() {
  return (
    <div className="App">
      {/* 그냥 있는 css 파일 가져다 쓸 때는 className을 쓰고
      우리가 여기서 스타일 정의해서 쓸 때는 그냥 style이라고 쓰면 됨 */}
      <h1 className="title">제목제목</h1>
      <Counter/>
    </div>
  );
}

export default App;
