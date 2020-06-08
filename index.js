// index.js
require("dotenv").config(); // this will read the .env file, if it exists

const { PORT = 3000, API_KEY } = process.env;
const BASE_URL = "https://api.spoonacular.com/recipes/";
const BASE_WINE = "https://api.spoonacular.com/food/wine";
const axios = require("axios");
const express = require("express");
const server = express();
const morgan = require("morgan");

server.use(morgan("dev"));

server.use(express.static("public"));

const bodyParser = require("body-parser");

server.get("/search", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const URL = `${BASE_URL}search?apiKey=${API_KEY}&query=${searchTerm}`;
    const { data } = await axios.get(URL);
    console.log(URL);
    res.send({ results: data });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

//Back-End to get Wine Information
server.get("/pairing", async (req, res) => {
  try {
    const { wineTerm } = req.query;
    const URL = `${BASE_WINE}/pairing?apiKey=${API_KEY}&food=${wineTerm}`;
    console.log(URL);
    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

server.get("/trivia", async (req, res) => {
  try {
    const URL = `https://api.spoonacular.com/food/trivia/random?apiKey=${API_KEY}`;
    console.log(URL);
    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

server.get(`/mealplanner`, async (req, res) => {
  try {
    const URL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${API_KEY}`;
    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});
server.listen(PORT, () => {
  console.log("I am listening...");
});
