const express =  require('express');
const dotenv  = require('dotenv');
const bible = require('./src/routes/bible.route.js');
const rateLimit = require("express-rate-limit");

dotenv.config();
const app = express(); 
app.use(express.json());

const PORT = 3000; 

const getLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to verses application." });
});

//app.use('/api', programmingLanguagesRouter);
app.use('/api/bible', getLimiter, bible);

// app.use("/api", (req, res) => {
//   res.status(200).send("successful");
// });

app.listen(PORT, (error) => {
  console.log(`Server running on port: ${PORT}`)
})

