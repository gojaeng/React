import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { cleanup } from "@testing-library/react";
import { Nav } from "react-bootstrap";
import {Context1} from './../App.js' 

function Detail(props) {
  let [Fade2, setFade2] = useState('')

  useEffect(()=>{
    setTimeout(()=>{setFade2('end')},100)
    return ()=>{
      setFade2('')
    }
  },[])

  let { id } = useParams();
  let 찾은상품 = props.shoes.find((x) => x.id == id);
  let [탭, 탭변경] = useState(0)
  let [count, setCount] = useState(0);
  let [alert, setalert] = useState(true);
  let [num, setNum] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setalert(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, [count]);

  useEffect(() => {
    if (isNaN(num) == true) {
      console.log("숫자만 입력하세요.");
    }
  }, [num]);
  return (
    <div className={"container start " + Fade2} >
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id - 1].title}</h4>
          <p>{props.shoes[id - 1].content}</p>
          <p>{props.shoes[id - 1].price}</p>
          <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(2)}}eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent shoes={props.shoes} 탭={탭}/>
    </div>
  )
}
function TabContent({탭}){
  let [Fade, setFade] = useState('')
  let {재고} = useContext(Context1)
  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')},100)
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  },[탭])
  return( 
    <div className={"start " + Fade }>
      {[<div>{재고}</div>, <div></div>, <div>내용2</div> ][탭]}
    </div>)
}
export default Detail;
