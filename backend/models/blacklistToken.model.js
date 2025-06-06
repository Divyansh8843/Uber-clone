const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unque: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const blacklistTokenModel = mongoose.model(
  "blacklistTokenModel",
  blacklistTokenSchema
);
module.exports = blacklistTokenModel;
