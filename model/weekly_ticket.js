const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Weekly_Tickets = new Schema({
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
  userId: {
    type: Number,
    default: 0,
  },

  CreatedAt: {
    type: Date,
    default: Date.now(),
  },

  ticket_count: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Weekly_Tickets", Weekly_Tickets);
