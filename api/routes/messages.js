const express = require('express');
const router = express.Router();

const { storeMessage, updateMessage } = require('../controllers/messages');

router.post('/', storeMessage);
router.put('/:id', updateMessage);

module.exports = router;
