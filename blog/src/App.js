/* eslint-disable */

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "구로 맛집",
    "React 공부법",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.sort();
          글제목변경(copy);
        }}
      >
        글수정
      </button>
      {글제목.map(function (a, i) {
        return (
          <div className="list">
            <h4 onClick={()=>{setModal(!modal)}}>
              {글제목[i]}
              <span
                onClick={() => {
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}
              >
                👍
              </span>
              {따봉[i]}
            </h4>
            <p>4월 15일 발행</p>
          </div>
        );
      })}
      {modal == true ? <Modal 글제목={글제목} 글제목변경={글제목변경}></Modal> : null}
    </div>
  );
}
function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[0]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy);
      }}>글 수정</button>
    </div>
  );
}
export default App;
