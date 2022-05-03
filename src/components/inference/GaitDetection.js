import React, { useEffect, useState } from "react";
import { GAIT_CLASSES } from "../gaitLogger/GaitLogger";
import { SocketContext } from "../common/SocketProvider";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import spasticGif from "../../assets/spastic.gif";
import walkingGif from "../../assets/walking.gif";
import standingGif from "../../assets/standing.gif";
import waddlingGif from "../../assets/waddling.gif";
import propulsiveGif from "../../assets/propulsive.gif";

export const SOCKET_EVENTS = {
  INFERENCE_START: "INFERENCE_START",
  INFERENCE_STARTED: "INFERENCE_STARTED",
  INFERENCE_STOP: "INFERENCE_STOP",
  INFERENCE_RESULT: "INFERENCE_RESULT",
};

const ACTIVITY_GAIT_CLASSES_MAP = Object.keys(GAIT_CLASSES)
  .map((key) => GAIT_CLASSES[key])
  .reduce((acc, curr) => {
    acc[Number(curr.value) - 1] = curr;
    return acc;
  }, {});

function GaitGif(props) {
  const { gaitActivity } = props;

  switch (gaitActivity) {
    case GAIT_CLASSES.noMovement.name:
      return (
        <img className="gait-gif" src={standingGif} alt="Standing Gif"></img>
      );
    case GAIT_CLASSES.normalGait.name:
      return (
        <img className="gait-gif" src={walkingGif} alt="Walking Gif"></img>
      );
    case GAIT_CLASSES.waddlingGait.name:
      return (
        <img className="gait-gif" src={waddlingGif} alt="Waddling Gif"></img>
      );
    case GAIT_CLASSES.propulsiveGait.name:
      return (
        <img
          className="gait-gif"
          src={propulsiveGif}
          alt="Propulsive Gif"
        ></img>
      );
    case GAIT_CLASSES.spasticGait.name:
      return (
        <img className="gait-gif" src={spasticGif} alt="Spastic Gif"></img>
      );
    default:
      return (
        <img className="gait-gif" src={standingGif} alt="Standing Gif"></img>
      );

    // return null;
  }
}

function GaitDetection(props) {
  const { socket } = props;
  const [inferenceStatus, updateInferenceStatus] = useState("null");
  const [gaitState, updateGaitState] = useState(null);

  useEffect(() => {
    socket.emit(SOCKET_EVENTS.INFERENCE_START);
    socket.on(SOCKET_EVENTS.INFERENCE_RESULT, inferenceStatusHandler);

    return () => {
      socket.emit(SOCKET_EVENTS.INFERENCE_STOP);
    };
  }, [socket]);

  const inferenceStatusHandler = (data) => {
    const { value } = data;
    // console.log(value);
    updateGaitState(value);
  };
  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <Card sx={{ display: "flex", height: "60vh" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Gait Detection
            </Typography>

            {gaitState != undefined && (
              <div>
                <Typography component="div" variant="h6">
                  The person has{" "}
                  {ACTIVITY_GAIT_CLASSES_MAP[gaitState].displayName}.
                </Typography>
                <GaitGif
                  gaitActivity={ACTIVITY_GAIT_CLASSES_MAP[gaitState].name}
                ></GaitGif>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {({ socket }) => <GaitDetection {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
}
