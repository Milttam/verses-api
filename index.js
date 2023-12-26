import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 
const PORT = 3000; 
  

app.listen(PORT, (error) => {
  console.log(`Server running on port: ${PORT}`)
})