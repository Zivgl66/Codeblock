import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    protocol: "wss",
    "force new connection": true,
    'try multiple transports': true,
    forceNew: true,
    tryTransportsOnConnectTimeout: true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling', 'polling'],
    allowEIO3: true,
    "polling duration": 10,
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
