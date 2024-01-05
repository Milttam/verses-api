const bcrypt = require("bcrypt");
const cxn = require("../models/db.js");

/** Check whether the API key in the request is in the MySQL key table */
const verifyKey = async (req, res, next) => {
  // Get the API key from the request headers
 //console.log(req.headers)

  const apiKey = req.headers.apikey;

  let query = 
    `SELECT hashed_api_key
      FROM ApiKeys;`;
  cxn.query(query, (err, result) => {
    //console.log(result)
    for (let i = 0;i<result.length;i++){
      bcrypt.compare(apiKey, result[i].hashed_api_key, (e,isMatch)=>{
        try {
          if (isMatch) {
            //console.log("success!")
            //res(null, true)
            next();
          } 
        } catch (e){
          //console.log("Error comparing keys")
          res.status(500).json({message: e.message})
        }
      })
    }
  })
};

module.exports = { verifyKey };