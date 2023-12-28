const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bible.controller.js');

/* GET operation */
router.get('/find/:book/:chap/:verse', bibleController.getVerse);

module.exports = router;