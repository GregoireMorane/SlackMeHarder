const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const createChannel = async (req, res) => {
  const name = req.body.name;
  await dataLayer.createChannel(name);
  webSocket.notifyClienOfNewChannel(req.socket, name);
  res.send(201, name);
};

const getChannels = async (req, res) => {
  const channelsList = await dataLayer.getChannels();
  res.send(200, channelsList);
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
    };
  });
  res.send(200, filteredList);
};

module.exports = {
  createChannel,
  getChannels,
  getMessageByChannel,
};
