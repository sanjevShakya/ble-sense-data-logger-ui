import React from "react";
import "./registerChart";
// import Routes from "./Routes";
import Routes from "./Routes";
import SocketProvider from "./common/SocketProvider";
import { BrowserRouter } from "react-router-dom";

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
