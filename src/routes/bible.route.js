const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bible.controller.js');
const auth = require('../middlewares/index.js');

/* GET operation */

router.get('/find', auth.verifyKey, bibleController.getPassage);

router.get('/info', bibleController.getInfo);

// Generate API key option
router.post('/generate-key', bibleController.generateKey);

module.exports = router;