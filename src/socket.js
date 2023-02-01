import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    forceNew: true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: [
      "websocket",
      "flashsocket",
      "htmlfile",
      "xhr-polling",
      "jsonp-polling",
    ],
    allowEIO3: true,
    "polling duration": 10,
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
