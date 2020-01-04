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
  const { content, userId } = req.body.message;
  const id = req.params.id;
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  
  if (userId === session.user_id) {
    await dataLayer.updateOneMessage(content, id);
    webSocket.notifyClientMessageHasBeenUpdated(req.socket, content);
    res.status(201).send('a message has been updated');
  }
}

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  const session = await dataLayer.findSessionById(req.cookies.sessionId);
  const message = await dataLayer.getOneMessage(id);

  if (message.user_id === session.user_id) {
    await dataLayer.deleteOneMessage(id);
    webSocket.notifyClientMessageHasBeenDeleted(req.socket);
    res.status(200).send('a message has been deleted');
  }
}

module.exports = {
  storeMessage,
  updateMessage,
  deleteMessage,
};
