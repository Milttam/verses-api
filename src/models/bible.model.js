const cxn = require("./db.js");
const { generateApiKey } = require('generate-api-key');
const bcrypt = require("bcrypt");

// constructor
const Bible = function(bible) {
  this.book = bible.book;
  this.chpater = bible.chapter;
  this.verse = bible.verse;
};

Bible.getVerse = (b,c,v, result) => {
  let query = "SELECT verse_text FROM Verses WHERE book_name = ? AND chapter_number = ? AND verse_number = ?";

  cxn.query(query, [b, c, v], (err, res) => {
    if (err) {
      //.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length == 0) {
      // not found verse with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res[0]);
  });
};

Bible.getChapter = (b, c, result) => {
  // SQL request which will get all the verses with requested book and chapter
  let query = "SELECT verse_text FROM Verses WHERE book_name = ? AND chapter_number = ?;"

  cxn.query(query, [b, c], (err, res)=>{
    // handle logic for response for response of the SQL request
    if (err) {
      result(err, null)
      return;
    }

    // The reseult will be a list of 
    console.log(res)
    result(null, res)
  })
}

Bible.generateKey = (req, result) => {
  // Generate a random API key
  const apiKey = generateApiKey();

  // Hash and salt the API key
  bcrypt.hash(apiKey, 10, (err, hashedApiKey) => {
    if (err) {
      console.log("Error hashing API key: ", err);
      result(err, null);
      return;
    }
    // console.log(apiKey);
    // console.log(hashedApiKey);
    // Create the `ApiKeys` table if it doesn't exist
    let createTableQuery = `
      CREATE TABLE IF NOT EXISTS ApiKeys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hashed_api_key VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY (hashed_api_key)
      );
    `;

    // Insert or update the record in the `ApiKeys` table
    let insertUpdateQuery = `
      INSERT INTO ApiKeys (hashed_api_key, created_at)
      VALUES (?, NOW())
      ON DUPLICATE KEY UPDATE hashed_api_key = VALUES(hashed_api_key), created_at = NOW();
    `;

    // Execute the queries one by one
    cxn.query(createTableQuery, (err) => {
      if (err) {
        // console.log("Error creating table: ", err);
        result(err, null);
        return;
      }    
      cxn.query(insertUpdateQuery, [hashedApiKey], (err, res) => {
        if (err) {
          // console.log("Error generating API key: ", err);
          result(err, null);
          return;
        }
        result(null, { apiKey }); // Return the unhashed API key to the user
      });
    });
  });
};

Bible.getInfo = (result=>{
  // Gets information such as the unique book name along with number of chapters
  let query = 
  `
    SELECT book_name, COUNT(DISTINCT chapter_number) AS number_of_chapters
    FROM Verses
    GROUP BY book_name;
  `

  cxn.query(query, (err, res)=>{
    if (err){
      result(err, null)
      return;
    } else {
      console.log(res)
      result(null, res)
      return;
    }
  })
})


module.exports = Bible;