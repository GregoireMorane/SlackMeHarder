const dataLayer = require('../data-layer');

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.findUserByUsername(username);
  if (user) {
    res.status(409).send('Username already taken');
  } else {
    await dataLayer.createUser(username, password);
    const userCreated = await dataLayer.findUserByUsername(username);
    await dataLayer.updateSession(req.cookies.sessionId, userCreated.id);
    res.status(201).send(username);
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await dataLayer.verifyUser(username, password);
  if (user) {
    await dataLayer.updateSession(req.cookies.sessionId, user.id);
    res.status(201).send('connected');
  } else {
    res.status(404).send('User not found');
  }
};

module.exports = {
  signup,
  signin,
};
