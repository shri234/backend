const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PaymentDetails = require('../../model/paymentdetails');
const TicketRate=require("../../model/ticket_rate")
const RedeemHistory=require("../../model/redeem_history");
const User=require("../../model/User")
const crypto = require('crypto');
const Razorpay=require('razorpay');
const Counter=require("../../model/Counter")
const moment=require('moment');
const wallet = require('../../model/wallet');

const addPaymentDetails = async (req, res) => {  
  // const secret="BLUESTOCKSINVESTMENT"
  // const accountno = crypto.createHmac('sha256', secret)
  //                                     .update(req.body.accountNo)
  //                                     .digest('hex');
  // const panno = crypto.createHmac('sha256', secret)
  //                                     .update(req.body.panNo)
  //                                     .digest('hex');
  // const ifsc = crypto.createHmac('sha256', secret)
  //                                     .update(req.body.IFSC)
  //                                     .digest('hex');
  // console.log(accountno)
  add_PaymentDetails=await PaymentDetails.create({
    name:req.body.name,
    phoneNumber:req.body.phoneno,
    email:req.body.email,
    accountNo:req.body.accountNo,
    IFSC:req.body.IFSC,
    panNo:req.body.panNo,
    aadharNo:req.body.aadharNo,
    address:req.body.address,
    userid:req.body.userid
  });
    return res.status(200).json({response:"Data inserted successfully"});
};

const get_paymentdetails = async (req, res) => {  
  let pageno=req.query.pageno
  let skip_page=pageno*10
    let get_paymentdetails=await PaymentDetails.find({}).skip(skip_page).limit(10)
    let get_count=await PaymentDetails.find().countDocuments();
    return res.status(200).json({response:"Got data successfully",data:get_paymentdetails,count:get_count});
};

const paymentIntegration = async (req, res) => {  
    try {
      let ticket_create=await TicketRate.updateOne({
        ticketRate:req.body.ticketRate
      },{
        ticketCount:req.body.ticketCount
      });
        const instance = new Razorpay({
            key_id: "rzp_test_LrYDgHpueIsSO0",
            key_secret: "851T3W2pweEZN1sObpmvibd5",
        });
        const options = {
            amount: req.body.amount, 
            currency: "INR", 
            receipt: "receipt_order_74394",
        };

        const order1 = await instance.orders.create(options);
        console.log(order1)
        if (!order1) return res.status(500).send("Some error occured");
        res.json(order1);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

const paymentVerification = async (req, res) => {  
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("inside",req.body)
    const secret = "851T3W2pweEZN1sObpmvibd5";
    const generated_signature = crypto.createHmac('sha256', secret)
                                      .update(razorpay_order_id + "|" + razorpay_payment_id)
                                      .digest('hex');
  console.log(generated_signature)
    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: "Payment has been verified" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  }
  catch(err){
    console.error("Error",err)
  }
  };

const redeemHistory=async (req,res)=>{
  try{
  const redeemId=await getNextSequenceValue("redeemId")
  const redeemHistory=await RedeemHistory.create({
    redeemId:redeemId,
    userId:req.body.userId,
    username:req.body.username,
    amount:req.body.amount,
    email:req.body.email
  });
    let wallet_history=await WalletHistory.create(
    {
      amount:parseInt(req.body.amount),
      userId:parseInt(req.body.userId),
      username:req.body.username,
      CreatedAt:date
    }
  )
  let wallet_find=await wallet.findOne({
    userId:req.body.userId
  })
  let wallet_redeem=await wallet.findOneAndUpdate({
    userId:req.body.userId,
  },
  {
    amount:wallet_find.amount-parseInt(req.body.amount)
  })
  return res.status(200).json({response:"Data Inserted successfully"});
}
catch(err){
  console.error("Error",err)
}
}

const getRedeemHistory=async (req,res)=>{
  try{
  let pageno=req.query.pageno
  let skip_page=pageno*10
  let all=[];
  
  const redeemHistory=await RedeemHistory.find({
    
  }).skip(skip_page).limit(10);
  for(let i=0;i<redeemHistory.length;i++){
    let user_find=await User.findOne({
      username:redeemHistory[i].username,
    })
  let get_all={
    CreatedAt:moment(redeemHistory[i].CreatedAt).format("DD/MM/YYYY"),
    amount:redeemHistory[i].amount,
    username:redeemHistory[i].username+`(${user_find.referralId})`,
    status:redeemHistory[i].status,
    redeemId:redeemHistory[i].redeemId,
    email:redeemHistory[i].email
  }
  all.push(get_all);
}
  let get_count=await RedeemHistory.find({}).countDocuments();
  return res.status(200).json({response:"Got Data successfully",data:all,count:get_count});
}catch(err){
  console.error("Error",err)
}
}

const deleteRedeemHistory=async (req,res)=>{
  let delete_one=await RedeemHistory.deleteOne({
    redeemId:req.query.redeemId
  });
  return res.status(200).json({response:"Deleted successfully"});
}

const updateRedeemHistory=async (req,res)=>{
  let delete_one=await RedeemHistory.updateOne({
    redeemId:req.query.redeemId
  },{
  status:true
  });
  return res.status(200).json({response:"Deleted successfully"});
}

async function getNextSequenceValue(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id:sequenceName},
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = {
    addPaymentDetails,
    paymentIntegration,
    get_paymentdetails,
    paymentVerification,
    redeemHistory,
    getRedeemHistory,
    deleteRedeemHistory,
    updateRedeemHistory
}


