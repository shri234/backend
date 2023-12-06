const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyresultschema = Schema({
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
const weeklyresult = mongoose.model("weekly-result", weeklyresultschema);
module.exports = weeklyresult;
