const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const priceratechema = Schema({
   priceRate_splitup:{
    type:String,
    default:null
   }
});
const pricerate = mongoose.model('pricerate', priceratechema);
module.exports = pricerate
