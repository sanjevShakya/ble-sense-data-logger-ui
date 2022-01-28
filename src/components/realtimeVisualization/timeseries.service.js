const INTERVAL = 20; // 20 milliseconds

function getRandomNumberBetween(min, max, fixed = 6) {
  const number = Math.random() * (max - min) + min;
  return Number(number.toFixed(fixed));
}

const generateData = (min, max) => () => {
  return getRandomNumberBetween(min, max);
};

export const generateX = (len) => {
  return Array(len)
    .fill(0)
    .map((v, index) => index + 1);
};

export const generateDataPeriodically = ({ min = 0, max = 1, cb }) => {
  if (!typeof cb === "function") {
    return new Error("callback required");
  }

  const dataGenerator = generateData(min, max);

  const dataInterval = setInterval(() => {
    const d = dataGenerator();
    cb(d);
  }, INTERVAL);

  return dataInterval;
};
