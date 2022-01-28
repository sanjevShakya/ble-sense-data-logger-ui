export const fixedQueue = (queueLimit) => {
  const data = [];
  return {
    push,
    get,
  };

  function push(item) {
    if (data.length === queueLimit) {
      dequeue();
      enqueue(item);
    }
    else if (data.length < queueLimit) {
      enqueue(item);
    }
  }

  function enqueue(item) {
    data.push(item);
  }

  function dequeue() {
    data.shift();
  }

  function get() {
    return data;
  }
};
