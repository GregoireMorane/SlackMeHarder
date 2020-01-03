const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const storeMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channel_id;
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  const message = await dataLayer.storeMessage(
    content,
    channelId,
    session.user_id
  );
  webSocket.notifyClientOfNewMessage(req.socket, content);
  res.status(201).send(message);
};

const updateMessage = async (req, res) => {
  const { content, userId, id } = req.body.message;
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  
  if (userId === session.user_id) {
    await dataLayer.updateOneMessage(content, id);
    webSocket.notifyClientOfNewMessage(req.socket, content);
    res.status(201).send('a message has been updated');
  }
}

module.exports = {
  storeMessage,
  updateMessage,
};
