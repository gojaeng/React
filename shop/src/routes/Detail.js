import React from "react";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import styled from 'styled-components'

let YellowBtn= styled.button`
  background: yellow;
  color: black;
  padding: 10px
`
let Box = styled.div`
  background :grey;
  padding: 20px;
`
function Detail(props) {

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x=> x.id==id);

  return ( 
    <div className="container">
      <YellowBtn>버튼</YellowBtn>
      <Box>박스</Box>
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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
