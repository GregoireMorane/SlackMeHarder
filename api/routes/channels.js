const express = require('express');
const router = express.Router();

const { createChannel, getChannels } = require('../controllers/channels');

router.post('/', createChannel);
router.get('/', getChannels);

module.exports = router;
