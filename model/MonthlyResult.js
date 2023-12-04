const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyresultschema = Schema({
  result_ticket: {
    type: String,
    default: null,
  },
  Winner: {
    type: String,
    default: null,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
const monthlyresult = mongoose.model("monthly-result", monthlyresultschema);
module.exports = monthlyresult;
