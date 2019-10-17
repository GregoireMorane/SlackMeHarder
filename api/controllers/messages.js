const dataLayer = require('../data-layer');

const storeMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channel_id;
  await dataLayer.storeMessage(content, channelId);
  res.send(201, 'message created');
};

module.exports = {
  storeMessage,
};
