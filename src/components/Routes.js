import React from "react";
import { Routes, Route } from "react-router-dom";

import AppContainer from "./common/AppContainer";

import Subject from "./subject/Subject";
import GaitLogger from "./gaitLogger/GaitLogger";

export const routes = {
  ROOT: {
    url: "/",
  },
  SUBJECT: {
    url: "/subjects",
  },
  GAIT_LOGGER: {
    url: "/subjects/:subjectId/gait-logger",
  },
  CLASSES: {
    url: "/classes",
  },
};

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
