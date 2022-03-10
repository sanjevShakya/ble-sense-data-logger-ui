import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/HighlightOff";
import PauseButton from "@mui/icons-material/Pause";
import { SocketContext } from "../common/SocketProvider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import * as gaitLoggerService from "../../services/gaitLoggerService";
import subjectService from "../../services/subjectService";

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

const SENSOR_NAMES = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const SOCKET_CONSTANTS = {
  STATE_CHANGE: "stateChange",
  GAIT_CLASS_CHANGE: "gaitClassChange",
  INIT_STATE: "initState",
  ACCEL_DATA: "serialData",
};

const GAIT_CLASSES = {
  noMovement: {
    name: "noMovement",
    displayName: "Stand still",
    value: 1,
    description: "Standing upright in one position",
  },
  normalGait: {
    name: "normalGait",
    displayName: "Normal gait",
    value: 2,
    description: "Normal gait walking",
  },
  waddlingGait: {
    name: "waddlingGait",
    displayName: "Waddling gait",
    value: 3,
    description: "Feets apart and walk like pengiun",
  },
  propulsiveGait: {
    name: "propulsiveGait",
    displayName: "Propulsive gait",
    value: 4,
    description:
      "Feets near, pointing forward and lean your back forward and move forward like your falling down",
  },
  spasticGait: {
    name: "spasticGait",
    displayName: "Spastic Gait",
    value: 5,
    description: "Feets inward, and move forward",
  },
  class6: {
    name: "class6",
    displayName: "Class 6",
    value: 6,
    description: "Free class to record",
  },
  class7: {
    name: "class7",
    displayName: "Class 7",
    value: 7,
    description: "Free class to record",
  },
  class8: {
    name: "class8",
    displayName: "Class 8",
    value: 8,
    description: "Free class to record",
  },
  class9: {
    name: "class9",
    displayName: "Class 9",
    value: 9,
    description: "Free class to record",
  },
};

const GAIT_CLASS_LIST = Object.keys(GAIT_CLASSES).map((k) => GAIT_CLASSES[k]);

function GaitLoggerApp(props) {
  let count = 0;
  const { socket } = props;
  const params = useParams();
  const [gaitClass, updateGaitClass] = useState(null);
  const [loggerState, setLoggerState] = useState(null);
  const [subject, updateSubject] = useState({});

  useEffect(() => {
    fetchSubjectById();
  }, []);

  useEffect(() => {
    socket.on(SOCKET_CONSTANTS.STATE_CHANGE, loggerStateListener);
    socket.on(SOCKET_CONSTANTS.GAIT_CLASS_CHANGE, gaitClassStateListener);
    // socket.on(SOCKET_CONSTANTS.ACCEL_DATA, handleReceiveAccelData);
    socket.emit(SOCKET_CONSTANTS.INIT_STATE, { subjectId: params.subjectId });

    return () => {
      socket.off(SOCKET_CONSTANTS.STATE_CHANGE, loggerStateListener);
    };
  }, [socket]);

  const loggerStateListener = (data) => {
    const { value } = data;
    setLoggerState(value);
  };

  const gaitClassStateListener = (data) => {
    const { value } = data;
    updateGaitClass(value);
  };

  // const handleReceiveAccelData = (data) => {
  //   if (data && data.sensorName === SENSOR_NAMES.RIGHT) {
  //     updateSerialData(data);
  //   }
  //   if (data && data.sensorName === SENSOR_NAMES.LEFT) {
  //     updateLeftSerialData(data);
  //   }
  // };

  const fetchSubjectById = () => {
    // const subjectId
    return subjectService
      .getById(params.subjectId)
      .then(({ data }) => {
        updateSubject(data.data);
      })
      .catch((err) => {});
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

  const reconnectSerial = () => {
    gaitLoggerService.reconnect().then((data) => {
      console.log("RECONNECTED");
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
                <IconButton
                  aria-label="reconnect"
                  onClick={() => reconnectSerial()}
                >
                  <LinkIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {subject.firstname + " " + subject.lastname}
              </Typography>{" "}
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {subject.firstname + " " + subject.lastname}
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
                    {GAIT_CLASS_LIST.map((gaitClass) => (
                      <MenuItem value={gaitClass.value} key={gaitClass.value}>
                        {gaitClass.displayName} - {gaitClass.description}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {!!gaitClass && loggerState === STATES.PAUSE && (
                <div>
                  <IconButton
                    aria-label="play"
                    onClick={() => handleStateChange(STATES.RECORD)}
                  >
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton
                    aria-label="clear"
                    onClick={() => handleStateChange(STATES.INIT)}
                  >
                    <ClearIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                </div>
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
