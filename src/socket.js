import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    'try multiple transports': true,
    forceNew: true,
    reconnect: true,
    tryTransportsOnConnectTimeout: true,
    reconnectionAttempt: "Infinity",
    timeout: 5000,
    transports: [ 'websocket','flashsocket', 'xhr-polling', 'htmlfile', 'xhr-multipart', 'jsonp-polling', 'polling'],
    allowEIO3: true,
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
