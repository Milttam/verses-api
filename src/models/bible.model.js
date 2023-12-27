const cxn = require("./db.js");

// constructor
const Bible = function(tutorial) {
  this.book = tutorial.book;
  this.chpater = tutorial.chapter;
  this.verse = tutorial.verse;
};

Bible.getVerse = (b,c,v, result) => {
  let query = "SELECT verse_text FROM Verses WHERE book_name = ? AND chapter_number = ? AND verse_number = ?";
  //console.log(b)
  cxn.query(query, [b, c, v], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length == 0) {
      // not found verse with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("verse: ", res);
    result(null, res[0]);
  });
};

module.exports = Bible;