const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const server = http.createServer(app)

const io = socketIO(server)

io.on('message', socket => {
  console.log('User connected')

  socket.on('message', (message) => {
    console.log('message', message)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
