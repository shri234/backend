const mongoose = require("mongoose");
const counter = require("./Counter");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose); // Import the plugin

let WeeklyHistory = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
  userId: {
    type: Number,
    default: 0,
  },
  ticket: {
    type: [
      {
        digit: {
          type: Number,
        },
        status: {
          type: String,
        },
      },
    ],
    default: null,
  },
  ticketCount: {
    type: Number,
    default: 0,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model("WeeklyHistory", WeeklyHistory);
