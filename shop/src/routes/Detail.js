import React from "react";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import { useState } from "react";
import { cleanup } from "@testing-library/react";

function Detail(props) {

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x=> x.id==id);
  let [count, setCount] = useState(0)
  let [alert, setalert] = useState(true);
  let [num, setNum] = useState('');

  useEffect(()=>{
    let a =setTimeout(()=>{setalert(false)},2000)
    return ()=>{
      clearTimeout(a)
    }
  }, [count])

  useEffect(()=>{
    if(isNaN(num)==true){
      console.log('숫자만 입력하세요.')
    }
  },[num])
  return ( 
    <div className="container">
      {
        alert==true
        ? <div className="alert alert-warning">
          2초 이내 구매시 할인
          </div>
        :null
      }
      {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id-1].title}</h4>
          <p>{props.shoes[id-1].content}</p>
          <p>{props.shoes[id-1].price}</p>
          <input onChange={(e)=>{setNum(e.target.value)}}/>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
