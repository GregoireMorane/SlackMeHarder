const dataLayer = require('../data-layer');

const whoAmI = async (req, res) => {
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  if (session && session.user_id) {
    const user = await dataLayer.findUserById(session.user_id);
    res.status(201).send(user);
  } else {
    res.status(404).send('User not found');
  }
};

module.exports = {
  whoAmI,
};
