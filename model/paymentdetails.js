const mongoose = require('mongoose') 
const Schema = mongoose.Schema 
const passportLocalMongoose = require('passport-local-mongoose'); 
let PaymentDetails = new Schema({ 
    name:{
        type:String,
        default:null
    },
    phoneNumber:{
        type:Number,
        default:0
    },
    email:{
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
    userid:{
        type:Number,
        default:0
    }
}) ;
  
// User.plugin(passportLocalMongoose); 
  
module.exports = mongoose.model('PaymentDetails', PaymentDetails)
