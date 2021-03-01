import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import HomeContainer from "./containers/home/HomeContainer";
import React from "react";
import HeaderComponent from './component/HeaderComponent';

function App() {
  return (
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
  );
}

export default App;
