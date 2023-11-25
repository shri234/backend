const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const priceratechema = Schema({
   priceRate_splitup:{
    type:String,
    default:null
   },
   
    CreatedAt:{
type:Date,
default:Date.now()
    }
   
});
const pricerate = mongoose.model('pricerate', priceratechema);
module.exports = pricerate
