const dataLayer = require('../data-layer');

const createChannel = async (req, res) => {
  const name = req.body.name;
  await dataLayer.createChannel(name);
  res.send(201, name);
};

module.exports = {
  createChannel,
};
