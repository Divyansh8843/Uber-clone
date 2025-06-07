require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const ConnectToDB = require("./db/db");
const cookieParser = require("cookie-parser");
ConnectToDB();
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const userRouter = require("./routes/user.routes");
const captionRouter = require("./routes/captain.routes");
app.use("/users", userRouter);
app.use("/captains", captionRouter);
module.exports = app;
