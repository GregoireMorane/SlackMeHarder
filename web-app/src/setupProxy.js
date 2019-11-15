const proxy = require('http-proxy-middleware');
const PORT = process.env.PORT;

module.exports = function(app) {
  app.use(
    proxy('/api', { target: `http://localhost:${PORT}`, changeOrigin: true })
  );
  app.use(
    proxy('/socket.io', {
      target: `http://localhost:${PORT}`,
      ws: true,
    })
  );
};
