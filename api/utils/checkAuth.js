const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const authChecker = async (req, res, next) => {
  console.log('authchecker');
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  if (session && session.user_id) {
    webSocket.notifyClientToTriggerAuth(req.socket, false);
    next();
  } else {
    res.status(401).send('Unauthorized');
    webSocket.notifyClientToTriggerAuth(req.socket, true);
  }
};

module.exports = {
  authChecker,
};
