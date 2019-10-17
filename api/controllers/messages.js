const dataLayer = require('../data-layer');

const storeMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channel_id;
  const message = await dataLayer.storeMessage(content, channelId);
  res.status(201).send(message);
};

module.exports = {
  storeMessage,
};
