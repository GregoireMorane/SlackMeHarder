const dataLayer = require('../data-layer');

const setSessionId = async (req, res, next) => {
  const cookie = req.cookies.sessionId;
  if (cookie === undefined) {
    let randomNumber = Math.random().toString();
    sessionId = randomNumber.substring(2, randomNumber.length);
    res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });

    const sessionExists = await dataLayer.findSessionById(sessionId);
    if (!sessionExists) {
      await dataLayer.createSession(sessionId, null);
    }
  } else {
    console.log('cookie exists', cookie);
  }
  next();
};

module.exports = { setSessionId };
