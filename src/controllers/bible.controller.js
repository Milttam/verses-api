const Bible = require('../models/bible.model.js');

// Find a single verse my book and chapter and verse
exports.getVerse = (req, res) => {
  let book = req.query.book;
  let chap = req.query.chap;
  let verse = req.query.verse;
  Bible.getVerse(book, chap, verse, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Verse not found for ${book} ${chap}:${verse}.`
        });
      } else {
        res.status(500).send({
          message:  `Error recieved for verse ${book} ${chap}:${verse}.`
        });
      }
    } else res.send(data);
  });
};