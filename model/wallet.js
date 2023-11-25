const mongoose = require('mongoose');
const counter=require("./Counter"); 
const Schema = mongoose.Schema 
// const passportLocalMongoose = require('passport-local-mongoose'); 
// const AutoIncrement = require('mongoose-sequence')(mongoose); // Import the plugin

let Wallet = new Schema({ 
    id:{
        type:Number
    },
    username: { 
        type: String 
    }, 
    userId:{
        type:Number,
        default:0
    },
    amount:{
        type:Number,
        default:null
    },
    ticketCount: {
        type: Number,
        default:0
      },
    CreatedAt:{
        type:Date,
        default:Date.now()
    }
}) 
  
// User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('Wallet', Wallet)

