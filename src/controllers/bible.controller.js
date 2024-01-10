const Bible = require('../models/bible.model.js');

// Find a single verse my book and chapter and verse
exports.getPassage = (req, res) => {
  let book = req.query.book;
  let chap = req.query.chap;
  let verse = req.query.verse;
  console.log(verse)
  if (book && chap && verse) {
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
  } else if (book && chap && !verse) {
    console.log("got to branch")
    Bible.getChapter(book, chap, (err, data) =>{
      console.log(data)
      if (err) {
        // logic for error
      } else {
        res.send(data);
      }
    })
  }
};

exports.generateKey = (req, res) => {
  Bible.generateKey(req, (err,data) => {
    if (err) {
      res.status(500).send({
        message: "Error while key generation"
      })
    } else res.send(data);
  })
}