const dataLayer = require('../data-layer');

const createChannel = async (req, res) => {
  const name = req.body.name;
  await dataLayer.createChannel(name);
  res.send(201, name);
};

const getChannels = async (res, req) => {
  const channelsList = await dataLayer.getChannels();
  console.log('channel list', channelsList);
  //   res.send(200, 'test');
};

module.exports = {
  createChannel,
  getChannels,
};
