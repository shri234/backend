const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const resultschema = Schema({
   result_ticket:{
    type:String,
    default:null
   },
   Winner:{
type:String,
default:null
   },
    CreatedAt:{
type:Date,
default:Date.now()
    }
   
});
const result = mongoose.model('result', resultschema);
module.exports = result
