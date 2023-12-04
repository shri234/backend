const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklypriceratechema = Schema({
  priceRate_splitup: {
    type: String,
    default: null,
  },

  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const weeklypricerate = mongoose.model(
  "weekly-pricerate",
  weeklypriceratechema
);
module.exports = weeklypricerate;
