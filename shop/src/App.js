import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, createContext, useEffect, useState, Suspense } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// import Detail from "./routes/Detail.js";
import axios from "axios";
// import Cart from "./routes/Cart.js";
import { useQuery } from "@tanstack/react-query";
export let Context1 = createContext();

const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(0);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery(["작명"], () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Navbar bg="white" variant="whitere">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("./detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("./cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav clssName="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map(function (a, i) {
                    return <Card shoes={shoes[i]} i={i + 1}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${
                        count + 2
                      }.json`
                    )
                    .then((결과) => {
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                      setCount(count + 1);
                    })
                    .catch(() => {
                      console.log("실패");
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Suspense fallback={<div>로딩중임</div>}>
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            </Suspense>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>없는 페이지</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>로케이션</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}
      
function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

export default App;

// import {useState, useTransition, useDeferredValue} from "react";

// let a = new Array(10000).fill(0)

// function App(){
//   let [name, setName] = useState('')
//   let [isPending, startTransition] = useTransition()
//   let state = useDeferredValue(name)

//   return (
//     <div className="App">
//       <input onChange={(e)=>{
//         startTransition(()=>{
//           setName(e.target.value)
//         })
//       }}/>
//       {
//         isPending ? '로딩중' :
//         a.map(()=>{
//           return <div>{name}</div>
//         })
//       }
//     </div>
//   )
// }

// export default App;