import React from "react";
import "./registerChart";
// import Routes from "./Routes";
import Routes from "./Routes";
import SocketProvider from "./common/SocketProvider";
import { BrowserRouter } from "react-router-dom";
import '../assets/css/app.css';

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
