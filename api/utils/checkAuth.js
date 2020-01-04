const dataLayer = require('../data-layer');

const authChecker = async (req, res, next) => {
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  if (session && session.user_id) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
  authChecker,
};
