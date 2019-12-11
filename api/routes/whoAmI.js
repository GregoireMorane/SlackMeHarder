const express = require('express');
const router = express.Router();

const { whoAmI } = require('../controllers/whoAmI');

router.get('/', whoAmI);

module.exports = router;
