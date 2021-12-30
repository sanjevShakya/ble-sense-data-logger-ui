import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseButton from "@mui/icons-material/Pause";
import { SocketContext } from "../common/SocketProvider";

let STATES = {
  INIT: 1,
  RECORD: 2,
  PAUSE: 3,
};

let STATE_DESC = {
  [STATES.INIT]: {
    name: "Initialization",
  },
  [STATES.RECORD]: {
    name: "Record",
  },
  [STATES.PAUSE]: {
    name: "Pause",
  },
};

function GaitLoggerApp(props) {
  const { socket } = props;
  const [loggerState, setLoggerState] = useState(null);

  useEffect(() => {
    const loggerStateListener = ({ value }) => {
      setLoggerState(value);
    };

    socket.on("stateChange", loggerStateListener);
    socket.emit("getState");
    return () => {
      socket.off("stateChange", loggerStateListener);
    };
  }, [socket]);

  const handleStateChange = (state) => {
    socket.emit("stateChange", { value: state });
  };

  return (
    <Grid container columns={12}>
      <Grid item xs={6}>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Gait Logger Device
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Sanjeev Shakya
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                Status: {(loggerState && STATE_DESC[loggerState].name) || "N/A"}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {loggerState === STATES.PAUSE && (
                <IconButton
                  aria-label="play"
                  onClick={() => handleStateChange(STATES.RECORD)}
                >
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
              )}
              {loggerState === STATES.RECORD && (
                <IconButton
                  aria-label="play"
                  onClick={() => handleStateChange(STATES.PAUSE)}
                >
                  <PauseButton sx={{ height: 38, width: 38 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
export default function (props) {
  return (
    <SocketContext.Consumer>
      {({ socket }) => <GaitLoggerApp {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
}
