require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/home", (req, res) => {
  res.send("Welcome to the Home Page!");
});
app.get("/about", (req, res) => {
  res.send("Welcome to the About Page!");
});

module.exports = app;
