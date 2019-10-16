const dataLayer = require('../data-layer');

const storeMessage = async (req, res) => {
  const content = req.body.content;
  const channeId = req.body.channelId;
  await dataLayer.storeMessage(content,channeId);
  res.send(201, "message created");
};

module.exports = {
  storeMessage,
};
