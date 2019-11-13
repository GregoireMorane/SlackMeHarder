const setSessionId = (req, res, next) => {
  const cookie = req.cookies.sessionId;
  if (cookie === undefined) {
    let randomNumber = Math.random().toString();
    sessionId = randomNumber.substring(2, randomNumber.length);
    res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true });
    console.log('cookie should have been set');
  } else {
    console.log('cookie exist', cookie);
  }
  next();
};

module.exports = { setSessionId };
