const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { findSessionById } = require('./api/data-layer');

const webSocket = require('./api/webSocket');

const { setSessionId } = require('./api/utils/setSessionId');

const routerChannels = require('./api/routes/channels');
const routerMessages = require('./api/routes/messages');
const routerAuth = require('./api/routes/auth');

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(setSessionId);

const authChecker = async (req, res, next) => {
  console.log(req.cookies.sessionId);
  const session = await findSessionById(req.cookies.sessionId);
  console.log('session', session);
  if (session && session.user_id) {
    console.log('user exists');
  } else {
    console.log('user or session does not exists');
  }
  next();
};

const server = http.createServer(app);
const socket = webSocket.getWebSocket(server);
app.use(webSocket.useSocket(socket));

app.use('/api/auth', routerAuth);

app.use(authChecker);

socket.on('connection', socket => {
  console.log('user connected');

  app.use('/api/channels', routerChannels);
  app.use('/api/messages', routerMessages);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, '0.0.0.0', function() {
  console.log(`Example app listening on port ${port}!`);
});
