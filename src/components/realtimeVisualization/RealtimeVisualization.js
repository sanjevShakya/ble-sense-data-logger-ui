import React, { useState, useEffect } from "react";
import * as timeSeriesDataService from "./timeseries.service";
import useFixedQueue from "./useFixedQueue";
import { Line } from "react-chartjs-2";

// import WorkerBuilder from "./worker/worker-builder";
// import ChartWorker from "./worker/charts.worker";
// const instance = new WorkerBuilder(ChartWorker);

// const config = {};
// const canvas = new window.HTMLCanvasElement();
// const offscreenCanvas = canvas.transferControlToOffscreen();

// worker.postMessage({canvas: offscreenCanvas, config}, [offscreenCanvas]);

const FIXED_QUEUE_LEN = 50;

const chart = (label, color, data) => {
  return {
    title: label,
    labels: timeSeriesDataService.generateX(data.length),
    datasets: [
      {
        label: label,
        fill: false,
        data: data,
        borderColor: color,
      },
    ],
  };
};

const axChart = (ax) => {
  return chart("a_x", "rgb(75, 192, 192)", ax);
};

const ayChart = (ay) => {
  return chart("a_y", "rgb(83, 192, 75)", ay);
};

const azChart = (az) => {
  return chart("a_z", "rgb(192, 75, 75)", az);
};

const options = {
  spanGaps: true, // enable for all datasets
  // showLine: false,
  animation: {
    duration: 0,
  },
  datasets: {
    line: {
      pointRadius: 0, // disable for all `'line'` datasets
    },
  },
  elements: {
    point: {
      radius: 0, // default to disabled in all datasets
    },
  },
  scales: {
    y: {
      type: "linear",
    },
  },
};

function RealtimeVisualization(props) {
  const loggerState = props.loggerState;
  const [count, updateCount] = useState(0);
  const [ax, updateAx] = useFixedQueue(FIXED_QUEUE_LEN);
  const [ay, updateAy] = useFixedQueue(FIXED_QUEUE_LEN);
  const [az, updateAz] = useFixedQueue(FIXED_QUEUE_LEN);

  useEffect(() => {}, []);

  useEffect(() => {
    if (props.serialData && count % 2 == 0) {
      const { value } = props.serialData;
      if (value && loggerState === 2) {
        const [axVal, ayVal, azVal, gx, gy, gz] = value.split(",");
        updateAx(axVal);
        updateAy(ayVal);
        updateAz(azVal);
      }
    }
    const newCount = count + 1;
    updateCount(newCount);
  }, [props.serialData, props.loggerState]);

  const handleReceiveData = (data) => {
    updateAx(data);
  };
  return (
    <div>
      <Line options={options} data={axChart(ax)} />;
      <Line options={options} data={ayChart(ay)} />;
      <Line options={options} data={azChart(az)} />;
    </div>
  );
}

export default RealtimeVisualization;
