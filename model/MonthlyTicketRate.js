const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyticketrateschema = Schema({
  ticketRate: { type: Number, default: 0 },
  priceRate_splitup: { type: String, default: null },
  CreatedAt: { type: Date, default: Date.now() },
});
const monthlyticketrate = mongoose.model(
  "monthly-ticketrate",
  monthlyticketrateschema
);
module.exports = monthlyticketrate;
