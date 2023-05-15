import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import data from './data.js';


function App() {

  let [shoes] = useState(data)
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {/* <Card shoes={shoes[0]} i={1}></Card>
          <Card shoes={shoes[1]} i={2}></Card>
          <Card shoes={shoes[2]} i={3}></Card> */}
          {
            shoes.map(function(a,i){
              return(
                <Card shoes={shoes[i]} i={i+1}></Card>
              )
            })
          }
        </div>
      </div>
    </div>

  );
}

function Card(props){
  return (
    <div className="col-md-4">
            <img src={"https://codingapple1.github.io/shop/shoes"+props.i+".jpg"} width="80%" />
              <h4>{props.shoes.title}</h4>
              <p>{props.shoes.content}</p>
          </div>
  )
}

export default App;
