const dataLayer = require('../data-layer');

const createChannel = async (req, res) => {
  const name = req.body.name;
  await dataLayer.createChannel(name);
  res.send(201, name);
};

const getChannels = async (req, res) => {
  const channelsList = await dataLayer.getChannels();
  res.send(200, channelsList);
};

getMessageByChannel = async (req, res) => {
  const id = req.params.id;
  const messagesList = await dataLayer.getMessageByChannel(id);
  res.send(200, messagesList);
};

module.exports = {
  createChannel,
  getChannels,
  getMessageByChannel,
};
