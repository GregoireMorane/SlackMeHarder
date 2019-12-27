const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const webSocket = require('./api/webSocket');
const { setSessionId } = require('./api/utils/setSessionId');
const { authChecker } = require('./api/utils/checkAuth');

const routerChannels = require('./api/routes/channels');
const routerMessages = require('./api/routes/messages');
const routerAuth = require('./api/routes/auth');
const routerWhoAmI = require('./api/routes/whoAmI');

const app = express();

app.use(express.static(path.join(__dirname, 'web-app', 'build')));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(setSessionId);

const server = http.createServer(app);
const io = require('socket.io').listen(server, {
  pingTimeout: 60000,
});
app.use(webSocket.useSocket(io));

app.use('/api/auth', routerAuth);
app.use('/api/whoami', routerWhoAmI);

io.on('connection', socket => {
  console.log('user connected');
  app.use(authChecker);

  app.use('/api/channels', routerChannels);
  app.use('/api/messages', routerMessages);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'web-app', 'build', 'index.html'));
// });

const port = process.env.PORT;

server.listen(port, '0.0.0.0', function() {
  console.log(`Example app listening on port ${port}!`);
});
