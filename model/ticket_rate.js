const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const ticketrateschema = Schema({
    ticketRate: { type: Number, default: 0 },
    CreatedAt:{type:Date,default:Date.now()}
});
const ticketrate = mongoose.model('ticketrate', ticketrateschema);
module.exports = ticketrate
