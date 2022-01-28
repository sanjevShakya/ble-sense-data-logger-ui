import { Chart } from "chart.js";

export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = function (event) {
    const { canvas, config } = event.data;
    const chart = new Chart(canvas, config);

    // Resizing the chart must be done manually, since OffscreenCanvas does not include event listeners.
    canvas.width = 100;
    canvas.height = 100;
    chart.resize();
  };
};
