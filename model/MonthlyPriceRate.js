const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlypriceratechema = Schema({
  priceRate_splitup: {
    type: [
      {
        first_digit: {
          type: String,
        },
        second_digit: {
          type: String,
        },
        third_digit: {
          type: String,
        },
        fourth_digit: {
          type: String,
        },
        status: {
          type: String,
        },
      },
    ],
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
