const express = require('express');
// const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// const webSocket = require('./api/webSocket');
const { setSessionId } = require('./api/utils/setSessionId');
const { authChecker } = require('./api/utils/checkAuth');

const routerChannels = require('./api/routes/channels');
const routerMessages = require('./api/routes/messages');
const routerAuth = require('./api/routes/auth');
const routerWhoAmI = require('./api/routes/whoAmI');

const app = express();

app.use(express.static(path.join(__dirname, 'web-app', 'build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'web-app', 'build', 'index.html'));
// });

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(setSessionId);

// const server = http.createServer(app);
// const io = require('socket.io').listen(server);
// app.use(webSocket.useSocket(io));

app.use('/api/auth', routerAuth);
app.use('/api/whoami', routerWhoAmI);
app.use(authChecker);
app.use('/api/channels', routerChannels);
app.use('/api/messages', routerMessages);

// io.on('connection', socket => {
//   console.log('user connected');


//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-app', 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT;

app.listen(port, '0.0.0.0', function() {
  console.log(`Example app listening on port ${port}!`);
});
