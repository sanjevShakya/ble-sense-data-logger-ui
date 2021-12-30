import io from "socket.io-client";
import config from "../../config";
import React, { useEffect, useState } from "react";

export const SocketContext = React.createContext({
  actions: {
    read: (f) => f,
    write: (f) => f,
  },
});

function SocketComponent(props) {
  const [socket, setSocket] = useState(null);
  console.log('socket', socket);

  useEffect(() => {
    const oSocket = io(config.socketURI);
    setSocket(oSocket);
    return () => oSocket.close();
  }, [setSocket]);

  return (
    <React.Fragment>
      {props.children({
        socket,
      })}
    </React.Fragment>
  );
}

export default function (props) {
  console.log('socket provider');
  return (
    <SocketComponent>
      {({ socket }) => (
        <SocketContext.Provider value={{ socket }}>
          {props.children}
        </SocketContext.Provider>
      )}
    </SocketComponent>
  );
}
