/* eslint-disable */

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState(["남자 코트 추천", "구로 맛집", "React 공부법"]);
  let [따봉,따봉변경] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={()=> { 
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
        }}>글수정</button>
      <div className="list">
        <h4>
          {글제목[0]} 
          <span onClick={()=> { 따봉변경(따봉+1) }}>👍</span> {따봉}
        </h4>
        <p>4월 15일 발행</p>
      </div>

      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>4월 15일 발행</p>
      </div>

      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>4월 15일 발행</p>
      </div>
    </div>
  );
}

export default App;
