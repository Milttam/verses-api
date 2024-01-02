const bcrypt = require("bcrypt");
const cxn = require("../models/db.js");

/** Check whether the API key in the request is in the MySQL key table */
const verifyKey = async (req, res, next) => {
  // Get the API key from the request headers
  console.log(req.headers)
  const apiKey = req.headers.apikey;

  // Hash the API key
  bcrypt.hash(apiKey, 10, (err, hashedApiKey) => {
    if (err) {
      console.log("Error hashing API key: ", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(hashedApiKey)
    // Check if the hashed API key exists in the `ApiKeys` table
    // let query = `
    //   SELECT id
    //   FROM ApiKeys
    //   WHERE hashed_api_key = ?;
    // `;
    let query = "SELECT * FROM ApiKeys;"

    cxn.query(query, [hashedApiKey], (err, result) => {
      if (err) {
        console.log("Error accessing database: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(hashedApiKey)
      console.log(result)

      // If the API key is valid, proceed to the next middleware/controller
      if (result.length > 0) {
        next();
      } else {
        // If the API key is invalid, return an error response
        return res.status(401).json({ error: "Invalid API key" });
      }
    });
  });
};

module.exports = { verifyKey };