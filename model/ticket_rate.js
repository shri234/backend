const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const ticketrateschema = Schema({
    ticketRate: { type: Number, default: 0 },
    priceRate_splitup:{type:String,default:null},
    CreatedAt:{type:Date,default:Date.now()}
});
const ticketrate = mongoose.model('ticketrate', ticketrateschema);
module.exports = ticketrate
