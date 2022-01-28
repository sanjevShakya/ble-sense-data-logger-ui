import { useState } from "react";
import { fixedQueue } from "./queue.util";

function useFixedQueue(queueLimit = 1000) {
  const [data, updateData] = useState([]);

  function insert(item) {
    if (data.length === queueLimit) {
      data.shift();
    }
    updateData(data.concat(Number(item)));
  }

  return [data, insert];
}

export default useFixedQueue;
