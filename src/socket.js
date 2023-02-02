import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    'try multiple transports': true,
    forceNew: true,
    reconnect: true,
    tryTransportsOnConnectTimeout: true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ['flashsocket', 'xhr-polling', 'htmlfile', 'xhr-multipart', 'websocket', 'jsonp-polling', 'polling'],
    allowEIO3: true,
    "polling duration": 10,
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
