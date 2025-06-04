require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const ConnectToDB = require("./db/db");
ConnectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const userRouter = require("./routes/user.routes");
app.use("/api/v1/user", userRouter);

module.exports = app;
