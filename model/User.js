const mongoose = require('mongoose');
const counter=require("./Counter"); 
const Schema = mongoose.Schema 
// const passportLocalMongoose = require('passport-local-mongoose'); 
// const AutoIncrement = require('mongoose-sequence')(mongoose); // Import the plugin

let User = new Schema({ 
    username: { 
        type: String 
    }, 
    password: { 
        type: String 
    },
    userId:{
        type:Number,
        default:0
    },
    role:{
        type:String
    },
    email:{
        type: String,
        default:null
    },
    mobileNumber:{
        type:Number,
        default:0
    },
    referralId:{
        type:String,
        default:null
    },
    agentId:{
        type:String,
        default:null
    },
    accountNo: { 
        type: String,
        default:null
    }, 
    panNo: { 
        type: String,
        default:null 
    } ,
    IFSC:{
        type:String,
        default:null
    },
    aadharNo:{
        type:String,
        default:null
    },
    address:{
        type: String,
        default:null
    },
    status:{
        type:Boolean,
        default:false
    }
}) 
  
// User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', User)

