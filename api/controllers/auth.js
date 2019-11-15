const dataLayer = require('../data-layer');

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.findUserByUsername(username);
  if (user) {
    res.send(409, 'Username already taken');
  } else {
    await dataLayer.createUser(username, password);
    const userCreated = await dataLayer.findUserByUsername(username);
    await dataLayer.updateSession(req.cookies.sessionId, userCreated.id);
    res.send(201, username);
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.verifyUser(username, password);
  if (user) {
    await dataLayer.updateSession(req.cookies.sessionId, user.id);
    res.send(201, 'connected');
  } else {
    res.send(404, 'User not found');
  }
};

module.exports = {
  signup,
  signin,
};
