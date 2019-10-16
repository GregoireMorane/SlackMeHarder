const express = require('express');
const router = express.Router();

const { createChannel, getChannels, getMessageByChannel } = require('../controllers/channels');

router.post('/', createChannel);
router.get('/', getChannels);
router.get(`/:id/messages`, getMessageByChannel);


module.exports = router;
