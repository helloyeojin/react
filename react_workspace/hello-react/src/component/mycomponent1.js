import React, {Component} from 'react';

// cc 클래스 기반 컴포넌트를 만들어줌
// 클래스 컴포넌트의 첫 글자는 대문자로 해야함
class Mycomponent1 extends Component {
  render() { 
    return (
      <div>
        <h1>클래스 기반 컴포넌트</h1>
      </div>
    );
  }
}

export default Mycomponent1;  // 컴포넌트를 외부로 노출시켜야 사용이 가능