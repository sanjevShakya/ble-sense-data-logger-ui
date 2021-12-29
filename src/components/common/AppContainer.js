import React from "react";
import AppBar from "./AppBar";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
function AppContainer() {
  return (
    <div>
      <AppBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default AppContainer;
