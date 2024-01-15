const Bible = require('../models/bible.model.js');

// Find a single verse my book and chapter and verse
exports.getPassage = (req, res) => {
  let book = req.query.book;
  let chap = req.query.chap;
  let verse = req.query.verse;
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
      } else {
        res.send({
          result:{
            type: "verse",
            description: `${book} ${chap}:${verse}`,
            text: [data.verse_text]
          }
        })
      };
    });
  } else if (book && chap && !verse) {
    Bible.getChapter(book, chap, (err, data) =>{
      console.log(data)
      if (err) {
        // logic for error
        res.status(500).send({
          message: `Error recieved for passage ${book} ${chap}`
        })
      } else {
        result = []
        for (let i = 0; i<data.length; i++){
          result.push(data[i].verse_text);
        }

        res.send({
          result: {
            type: "chapter",
            description: `${book} ${chap}`,
            text: result
          }
        });
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

exports.getInfo = (req, res) => {
  Bible.getInfo((err, data) => {
    if (err){
      res.status(500).send({
        message: "Error while getting information"
      })
    } else {
      res.send({
        result: {
          number_of_books:data.length,
          book_info:data
        }
      })
    }
  })
}