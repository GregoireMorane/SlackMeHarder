const express = require('express');
const router = express.Router();

const { storeMessage, updateMessage, deleteMessage } = require('../controllers/messages');

router.post('/', storeMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
