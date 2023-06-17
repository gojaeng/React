import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName, increase } from "../store/userSlice.js";
import { changeCount } from "../store.js";
import { addItem } from "../store.js";
import { memo, useMemo, useState } from "react";

let Child = memo(function () {
  console.log('재랜더링됨');
  return <div>자식임</div>;
});

// function 함수(){
//   return 10억번 돌리는 반복문 
// }

function Cart() {

  // let result = useMemo(()=>{return 함수()},[state])
  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });
  let [count, setItem] = useState(0);
  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setItem(count + 1);
        }}
      >
        +
      </button>
      {state.user.name}의 장바구니<br></br>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCount(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
