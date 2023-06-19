import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(()=>{
    if(count<3 && count!=0){
      setAge(age+1)
    }
  },[count])
  return (
    <div className="App">
      <div>안녕하십니까 전 {age}</div>
      <button onClick={()=>{
        setCount(count+1);
      }}>
        누르면 한살 먹기</button>
    </div>
  );
}

export default App;
