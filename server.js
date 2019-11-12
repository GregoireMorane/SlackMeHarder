const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const webSocket = require('./api/webSocket');

const routerChannels = require('./api/routes/channels');
const routerMessages = require('./api/routes/messages');

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);
const socket = webSocket.getWebSocket(server);
app.use(webSocket.useSocket(socket));

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
