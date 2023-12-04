const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlypriceratechema = Schema({
  priceRate_splitup: {
    type: String,
    default: null,
  },

  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const monthlypricerate = mongoose.model(
  "monthly-pricerate",
  monthlypriceratechema
);
module.exports = monthlypricerate;
