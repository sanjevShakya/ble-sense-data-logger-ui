import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseButton from "@mui/icons-material/Pause";
import { SocketContext } from "../common/SocketProvider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import RealtimeVisualization from "../realtimeVisualization/RealtimeVisualization";
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

const SOCKET_CONSTANTS = {
  STATE_CHANGE: "stateChange",
  GAIT_CLASS_CHANGE: "gaitClassChange",
  INIT_STATE: "initState",
  ACCEL_DATA: "serialData",
};

function GaitLoggerApp(props) {
  const { socket } = props;
  const params = useParams();
  const [gaitClass, updateGaitClass] = useState(null);
  const [serialData, updateSerialData] = useState("");
  const [loggerState, setLoggerState] = useState(null);

  useEffect(() => {
    const loggerStateListener = (data) => {
      const { value } = data;
      setLoggerState(value);
    };

    const gaitClassStateListener = (data) => {
      const { value } = data;
      updateGaitClass(value);
    };

    socket.on(SOCKET_CONSTANTS.STATE_CHANGE, loggerStateListener);
    socket.on(SOCKET_CONSTANTS.GAIT_CLASS_CHANGE, gaitClassStateListener);
    socket.on(SOCKET_CONSTANTS.ACCEL_DATA, handleReceiveAccelData);
    socket.emit(SOCKET_CONSTANTS.INIT_STATE, { subjectId: params.subjectId });

    return () => {
      socket.off(SOCKET_CONSTANTS.STATE_CHANGE, loggerStateListener);
    };
  }, [socket]);

  const handleReceiveAccelData = (data) => {
    if (data) {
      updateSerialData(data);
    }
  };

  const handleStateChange = (state) => {
    socket.emit(SOCKET_CONSTANTS.STATE_CHANGE, {
      value: state,
      subjectId: params.subjectId,
    });
    setLoggerState(state);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    socket.emit(SOCKET_CONSTANTS.GAIT_CLASS_CHANGE, {
      value: value,
      subjectId: params.subjectId,
    });
  };

  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
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
              {loggerState === STATES.INIT && (
                <div>
                  {" "}
                  <InputLabel id="gaitClassId">Gait Class</InputLabel>
                  <Select
                    labelId="gaitClassId"
                    id="gaitClassId"
                    label="Gait Classes"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Class 1</MenuItem>
                    <MenuItem value={2}>Class 2</MenuItem>
                    <MenuItem value={3}>Class 3</MenuItem>
                    <MenuItem value={3}>Class 4</MenuItem>
                    <MenuItem value={3}>Class 5</MenuItem>
                  </Select>
                </div>
              )}
              {!!gaitClass && loggerState === STATES.PAUSE && (
                <IconButton
                  aria-label="play"
                  onClick={() => handleStateChange(STATES.RECORD)}
                >
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
              )}
              {!!gaitClass && loggerState === STATES.RECORD && (
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

      <Grid item xs={12}>
        <Card sx={{ display: "flex" }}>
          <RealtimeVisualization loggerState={loggerState} serialData={serialData} />
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
