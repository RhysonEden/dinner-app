// index.js
require('dotenv').config(); // this will read the .env file, if it exists

const { PORT = 3000, API_KEY } = process.env;
const BASE_URL = "https://api.spoonacular.com/recipes/"
const axios = require("axios");
const express = require("express");
const server = express();
const morgan = require("morgan");

server.use(morgan("dev"));

server.use(express.static("public"));

const bodyParser = require("body-parser");

server.get('/search', async (req, res) => {  
  try {
    const { searchTerm } = req.query;
    const URL = `${BASE_URL}search?apiKey=${API_KEY}&query=${searchTerm}`

    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    console.log(error)
    res.send({ error });
  }
})

server.get('/hello', (req, res, next) => {
  res.send(`
  <html>
  <head></head>
  <body>
    <h3>Hello!</h3>
  </body>
  </html>
  `)
});

// server.listen(3000, () => {
//   console.log('I am listening...');
// });

server.listen(PORT, () => {
  console.log("I am listening...");
});