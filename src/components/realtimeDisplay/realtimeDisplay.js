import React from "react";

function RealtimeDisplay(props) {
  const { serialData } = props;
  if (!serialData) {
    return null;
  }
  const value = serialData.value || "";

  return <div>{value}</div>;
}

export default RealtimeDisplay;
