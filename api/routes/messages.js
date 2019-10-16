const express = require('express');
const router = express.Router();

const { storeMessage } = require('../controllers/messages');

router.post('/', storeMessage);

module.exports = router;
