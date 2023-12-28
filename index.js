const express =  require('express');
const dotenv  = require('dotenv');

const bible = require('./src/routes/bible.route.js');

dotenv.config();

const app = express(); 
const PORT = 3000; 

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to verses application." });
});


//app.use('/api', programmingLanguagesRouter);
app.use('/api/bible', bible);

app.use("/api", (req, res) => {
  res.status(200).send("successful");
});


app.listen(PORT, (error) => {
  console.log(`Server running on port: ${PORT}`)
})