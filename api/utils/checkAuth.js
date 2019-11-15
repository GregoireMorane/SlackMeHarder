const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const authChecker = async (req, res, next) => {
  console.log('authchecker');
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  if (session && session.user_id) {
    next();
  } else {
    res.status(401).send('Unauthorized');
    webSocket.notifyClientToTriggerAuth(req.socket);
  }
};

module.exports = {
  authChecker,
};
