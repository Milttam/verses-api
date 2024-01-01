const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bible.controller.js');
const auth = require('../middlewares/index.js');

/* GET operation */
router.get('/find', bibleController.getVerse);

// router.get('/find, auth, bibleController.getVerse);

// Generate API key option
router.get('/generate-key', bibleController.generateKey);

module.exports = router;