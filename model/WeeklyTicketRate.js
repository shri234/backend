const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyticketrateschema = Schema({
  ticketRate: { type: Number, default: 0 },
  priceRate_splitup: { type: String, default: null },
  CreatedAt: { type: Date, default: Date.now() },
});
const weeklyticketrate = mongoose.model(
  "weekly-ticketrate",
  weeklyticketrateschema
);
module.exports = weeklyticketrate;
