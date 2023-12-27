const Bible = require('../models/bible.model.js');

// Find a single verse my book and chapter and verse
exports.getVerse = (req, res) => {
  Bible.getVerse(req.params.book, req.params.chap, req.params.verse, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Verse not found for ${req.params.book} ${req.params.chap}:${req.params.verse}.`
        });
      } else {
        res.status(500).send({
          message:  `Error recieved for verse ${req.params.book} ${req.params.chap}:${req.params.verse}.`
        });
      }
    } else res.send(data);
  });
};