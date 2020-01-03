const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const createChannel = async (req, res) => {
  const name = req.body.name;
  await dataLayer.createChannel(name);
  webSocket.notifyClienOfNewChannel(req.socket, name);
  res.status(201).send(name);
};

const getChannels = async (req, res) => {
  const channelsList = await dataLayer.getChannels();
  res.status(200).send(channelsList);
};

getMessageByChannel = async (req, res) => {
  const id = req.params.id;
  const messagesList = await dataLayer.getMessageByChannel(id);
  const filteredList = messagesList.map(message => {
    return {
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      updated_at: message.updated_at,
      username: message.username,
      userId: message.app_user_id,
    };
  });
  res.status(200).send(filteredList);
};

module.exports = {
  createChannel,
  getChannels,
  getMessageByChannel,
};
