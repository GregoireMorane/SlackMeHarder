const dataLayer = require('../data-layer');

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.findUserByUsername(username);
  console.log('user', user);
  if (user) {
    res.send(409, 'Username already taken');
  } else {
    await dataLayer.createUser(username, password);
    res.send(201, username);
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.verifyUser(username, password);
  if (user) {
    await dataLayer.createSession(req.cookies.sessionId, user.id);
    res.send(201, 'connected');
  } else {
    res.send(404, 'User not found');
  }
};

module.exports = {
  signup,
  signin,
};
