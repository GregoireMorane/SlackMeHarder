const express = require('express');
const router = express.Router();

const { createChannel } = require('../controllers/channels');

router.post('/', createChannel);

module.exports = router;
