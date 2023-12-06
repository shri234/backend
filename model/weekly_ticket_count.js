const mongoose = require("mongoose");
const counter = require("./Counter");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose); // Import the plugin

let WeeklyTicketCount = new Schema({
  id: {
    type: Number,
  },
  username: {
    type: String,
  },
  userId: {
    type: Number,
    default: 0,
  },
  weeklyTicketCount: {
    type: Number,
    default: 0,
  },
  alreadyWeeklyTicketCount: {
    type: Number,
    default: 0,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model("WeeklyTicketCount", WeeklyTicketCount);
