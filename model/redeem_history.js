const mongoose = require('mongoose');
const counter=require("./Counter"); 
const Schema = mongoose.Schema 
// const passportLocalMongoose = require('passport-local-mongoose'); 
// const AutoIncrement = require('mongoose-sequence')(mongoose); // Import the plugin

let RedeemHistory = new Schema({ 
    redeemId:{
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
        type:String,
        default:null
    },
    status:{
        type:Boolean,
        default:false
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    }
}) 
  
// User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('RedeemHistory', RedeemHistory)

