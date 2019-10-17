const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

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

app.use('/api/channels', routerChannels);
app.use('/api/messages', routerMessages);

const server = http.createServer(app);
const io = socketIO(server);

// app.io = io;
// io.of('/api/message').on('connection', socket => {
//   console.log('user connected');

//   socket.on('message', data => {
//     console.log('message : ', data);
//   });

//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
// });

server.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
