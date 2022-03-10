import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import AppContainer from "./common/AppContainer";

import Subject from "./subject/Subject";
import GaitLogger from "./gaitLogger/GaitLogger";
import {routes} from '../constants/routes';

function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.ROOT.url} element={<AppContainer />}>
        <Route path={routes.SUBJECT.url} element={<Subject />} />
        <Route path={routes.GAIT_LOGGER.url} element={<GaitLogger />} />
        <Route path={routes.CLASSES.url} element={<div />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
