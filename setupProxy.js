const proxy = require('http-proxy-middleware');
const URI = 'http://localhost:3001';
module.exports = function(app) {
  console.log("proxy works")
  const apiProxy = proxy('/api', { target: URI });
  const wsProxy = proxy('/socket.io', { ws: true, target: URI });
  app.use(apiProxy);
  app.use(wsProxy);
};
