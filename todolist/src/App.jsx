import React, {useState, useEffect,useRef} from 'react';
import './App.css';
import Home from './component/home';
import { Outlet } from "react-router-dom";


function App () {
  return (
    <>
    <div className="App">
      <Home/>
    </div>
    
    </>
  );
}

export default App;