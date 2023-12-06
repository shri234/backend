const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Monthly_Tickets = new Schema({
  ticketId: {
    type: Number,
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
  },
  ticket_count: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Number,
    default: 0,
  },

  CreatedAt: {
    type: Date,
    default: Date.now(),
  },

  StartedAt: {
    type: Date,
    default: Date.now(),
  },
  EndedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Monthly_Tickets", Monthly_Tickets);
