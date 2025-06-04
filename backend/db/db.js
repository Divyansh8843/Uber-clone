const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_DB_URL;
async function ConnectToDB() {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
}
module.exports = ConnectToDB;
