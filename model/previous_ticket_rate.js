const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const previousTicketRate = Schema({
  previous_daily_ticket_rate: {
    type: Number,
    default: null,
  },
  previous_daily_ticket_rate_called: {
    type: Number,
    default: null,
  },
  previous_weekly_ticket_rate: {
    type: Number,
    default: null,
  },
  previous_weekly_ticket_rate_called: {
    type: Number,
    default: null,
  },
  previous_monthly_ticket_rate: {
    type: Number,
    default: null,
  },
  previous_monthly_ticket_rate_called: {
    type: Number,
    default: null,
  },
});

const previousticketrate = mongoose.model(
  "previous-ticket-rate",
  previousTicketRate
);
module.exports = previousticketrate;
