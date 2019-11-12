const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const storeMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channel_id;
  const message = await dataLayer.storeMessage(content, channelId);
  webSocket.notifyClientOfNewMessage(req.socket, content);
  res.status(201).send(message);
};

module.exports = {
  storeMessage,
};
