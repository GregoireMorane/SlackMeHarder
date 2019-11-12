const socketIO = require('socket.io');

const getWebSocket = server => {
  return socketIO(server);
};

const useSocket = socket => (req, res, next) => {
  req.socket = socket;
  next();
};

const notifyClientOfNewMessage = (socket, message) => {
  socket.emit('sendMessageToClient', message);
  console.log('message : ', message);
};

module.exports = {
  getWebSocket,
  useSocket,
  notifyClientOfNewMessage,
};
