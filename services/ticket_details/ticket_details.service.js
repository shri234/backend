const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Ticket = require("../../model/tickets");
const Counter = require("../../model/Counter");
const History = require("../../model/play_history");
const User = require("../../model/User");
const TicketRate = require("../../model/ticket_rate");
const moment = require("moment");
const WalletHistory=require("../../model/wallet_history");
const Wallet=require("../../model/wallet")


const addTicketDaily = async (req, res) => {
  try {
    let date = new Date();
    const ticketId = await getNextSequenceValue("ticketId");
    let ticket_count = await TicketRate.find({
      CreatedAt: {
        $gt: new Date(date.setDate(date.getDate())),
        $lt: new Date(date.setDate(date.getDate() + 1)),
      },
    });
    let user_find = await User.findOne({
      userId: parseInt(req.body.userId),
    });
    // let ticket=await Ticket.findOne({
    //   userId:parseInt(req.query.userId),
    //   ticketId:parseInt(req.query.ticketId)
    // });

    // console.log(ticket);
    
    
let wallet_u=await Wallet.findOne({
  userId:parseInt(req.body.userId)
})
if(wallet_u.ticketCount>0){
    let wallet_update=await Wallet.updateOne({
      userId:parseInt(req.body.userId)
    },
    {
      ticketCount:wallet_u.ticketCount-1
    });
    let date=new Date();
    let start_date=new Date(date.setHours(date.getHours()+5))
    new Date(date.setMinutes(date.getMinutes()+30))
    const add_ticket = await Ticket.create({
      userId:parseInt(req.body.userId),
      ticketId:ticketId,
      ticket: req.body.ticket,
      CreatedAt:date
    });
  }
  else{
    console.log("tickets you have bought is complete please buy more");
  }

    const id = await getNextSequenceValue("id");
    let user_history = await History.create({
      username: user_find.username,
      userId: parseInt(req.body.userId),
      ticket: req.body.ticket,
      id: id,
    });
    res.status(200).json({ response: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ response: "Error inserting data" });
  }
};

const get_Minimum = async (req, res) => {
  let get_data;
  let firstdigit_arr = [];
  let seconddigit_arr=[];
  let thirddigit_arr = [];
  let fourthdigit_arr=[];
  let lowestValueArr=[];
  let zeroth=0;
  let oneth=0
  let twoth=0
  let threeth=0
  let fourth=0
  let fifth=0
  let sixth=0
  let seventh=0
  let eigth=0
  let nineth=0;
  let first;
  let a;
  let all_data;
  let digit =parseInt(req.query.digit);
  // get_data = await Ticket.aggregate([
  //   {
  //     $match: {
  //       "ticket.0.digit": 0,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$ticket.0.digit",
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]);
get_data=await Ticket.find({});

  for (let i = 0; i < get_data.length; i++) {
    if(digit==1){
    firstdigit_arr.push(get_data[i].ticket[0].digit);
    }
    else if(digit==2){
    seconddigit_arr.push(get_data[i].ticket[1].digit);
    }
    else if(digit==3){
    thirddigit_arr.push(get_data[i].ticket[2].digit);
    }
    else if(digit==4){
    fourthdigit_arr.push(get_data[i].ticket[3].digit);
    }
  }

  if(digit==1){
  for(let j=0;j<firstdigit_arr.length;j++){
    if(firstdigit_arr[j]==0){
      zeroth+=1
    }
    else if(firstdigit_arr[j]==1){
      oneth+=1
    }
    else  if(firstdigit_arr[j]==2){
      twoth+=1
    }
    else  if(firstdigit_arr[j]==3){
      threeth+=1
    }
    else  if(firstdigit_arr[j]==4){
      fourth+=1
    }
    else  if(firstdigit_arr[j]==5){
      fifth+=1
    }
    else  if(firstdigit_arr[j]==6){
      sixth+=1
    }
    else  if(firstdigit_arr[j]==7){
      seventh+=1
    }
    else  if(firstdigit_arr[j]==8){
      eigth+=1
    }
    else if(firstdigit_arr[j]==9){
      nineth+=1
    }
  }
}
else if(digit==2){
  for(let j=0;j<seconddigit_arr.length;j++){
    if(seconddigit_arr[j]==0){
      zeroth+=1
    }
    else if(seconddigit_arr[j]==1){
      oneth+=1
    }
    else  if(seconddigit_arr[j]==2){
      twoth+=1
    }
    else  if(seconddigit_arr[j]==3){
      threeth+=1
    }
    else  if(seconddigit_arr[j]==4){
      fourth+=1
    }
    else  if(seconddigit_arr[j]==5){
      fifth+=1
    }
    else  if(seconddigit_arr[j]==6){
      sixth+=1
    }
    else  if(seconddigit_arr[j]==7){
      seventh+=1
    }
    else  if(seconddigit_arr[j]==8){
      eigth+=1
    }
    else if(seconddigit_arr[j]==9){
      nineth+=1
    }
  }
}
else if(digit==3){
  for(let j=0;j<thirddigit_arr.length;j++){
    if(thirddigit_arr[j]==0){
      zeroth+=1
    }
    else if(thirddigit_arr[j]==1){
      oneth+=1
    }
    else  if(thirddigit_arr[j]==2){
      twoth+=1
    }
    else  if(thirddigit_arr[j]==3){
      threeth+=1
    }
    else  if(thirddigit_arr[j]==4){
      fourth+=1
    }
    else  if(thirddigit_arr[j]==5){
      fifth+=1
    }
    else  if(thirddigit_arr[j]==6){
      sixth+=1
    }
    else  if(thirddigit_arr[j]==7){
      seventh+=1
    }
    else  if(thirddigit_arr[j]==8){
      eigth+=1
    }
    else if(thirddigit_arr[j]==9){
      nineth+=1
    }
  }
}
else if(digit==4){
  for(let j=0;j<fourthdigit_arr.length;j++){
    if(fourthdigit_arr[j]==0){
      zeroth+=1
    }
    else if(fourthdigit_arr[j]==1){
      oneth+=1
    }
    else  if(fourthdigit_arr[j]==2){
      twoth+=1
    }
    else  if(fourthdigit_arr[j]==3){
      threeth+=1
    }
    else  if(fourthdigit_arr[j]==4){
      fourth+=1
    }
    else  if(fourthdigit_arr[j]==5){
      fifth+=1
    }
    else  if(fourthdigit_arr[j]==6){
      sixth+=1
    }
    else  if(fourthdigit_arr[j]==7){
      seventh+=1
    }
    else  if(fourthdigit_arr[j]==8){
      eigth+=1
    }
    else if(fourthdigit_arr[j]==9){
      nineth+=1
    }
  }
}
  // for (let j = 0; j < get_data.length; j++) {
  //   if (get_data[j].count == Math.min.apply(Math, all_arr)) {
  //     a = get_data[j]._id;
  //   }

  lowestValueArr.push(oneth,zeroth,twoth,threeth,fourth,fifth,sixth,seventh,eigth,nineth);

all_data=[{
id:0,
count:zeroth
},{
  id:1,
  count:oneth
},
{id:2,
count:twoth},
{
  id:3,
  count:threeth
},
{
  id:4,
  count:fourth
},
{
  id:5,
  count:fifth
},
{
  id:6,
  count:sixth
},
{
  id:7,
  count:seventh
},
{
  id:8,
  count:eigth
},
{
id:9,
count:nineth
}
]

a=Math.min.apply(Math,lowestValueArr)
  return res.status(200).json({
    response: "Got data successfully",
    data: all_data,
    LowestValue: a,
  });
};

const getTickets = async (req, res) => {
  try{
  let pageno = req.query.pageno;
  let skip_page = pageno * 10;
  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);
  let end_date = new Date(date.setHours(date.getHours() + 24));
  let get_tickets = await Ticket.find({
    userId: req.query.userId,
    CreatedAt: {
      $gt: start_date,
      $lt: end_date,
    },
  })
    .skip(skip_page)
    .limit(10);

  let ticket_count = await Ticket.find({
    userId: req.query.userId,
    CreatedAt: {
      $gt: start_date,
      $lt: end_date,
    },
  }).countDocuments();

  return res.status(200).json({
    response: "Got data successfully",
    data: get_tickets,
    count: ticket_count,
  });
}
catch(err){
  console.error("Error",err)
}
};

const publish_result = async (req, res) => {
  let body_data = req.body;
  let userid;
  let firstdigit;
  let seconddigit;
  let thirddigit;
  let fourthdigit;
  let t = 0;

  let ticket_data = await Ticket.find({});
  for (let i = 0; i < ticket_data.length; i++) {
    userid = ticket_data[i].userId;
    for (let j = 0; j < 4; j++) {
      if (j == 0) {
        if (ticket_data[i].ticket[0].digit == req.body[0].digit) {
          firstdigit = req.body[0].digit;
          let ticket_update=await Ticket.findOneAndUpdate({
            ticketId:ticket_data[i].ticketId
          },{
            "ticket.0.status":true
          })
          // let status_update=await Ticket.findOneAndUpdate({
          //     ticketId:ticket_data[i].ticketId,
          // },{
          //     status:"true"
          // });
        }
      } else if (j == 1) {
        if (ticket_data[i].ticket[1].digit == req.body[1].digit) {
          seconddigit = req.body[1].digit;
          let ticket_update=await Ticket.findOneAndUpdate({
            ticketId:ticket_data[i].ticketId
          },{
            "ticket.1.status":true
          })
        }
      } else if (j == 2) {
        if (ticket_data[i].ticket[2].digit == req.body[2].digit) {
          thirddigit = req.body[2].digit;
          let ticket_update=await Ticket.findOneAndUpdate({
            ticketId:ticket_data[i].ticketId
          },{
            "ticket.2.status":true
          })
        }
      } else if (j == 3) {
        if (ticket_data[i].ticket[3].digit == req.body[3].digit) {
          fourthdigit = req.body[3].digit;
          let ticket_update=await Ticket.findOneAndUpdate({
            ticketId:ticket_data[i].ticketId
          },{
            "ticket.3.status":true
          })
        }
      }
    }
  }
  console.log(firstdigit, seconddigit, thirddigit, fourthdigit);
  if (
    firstdigit != undefined &&
    seconddigit != undefined &&
    thirddigit != undefined &&
    fourthdigit != undefined
  ) {
    t += 1;
    let ticket_check =
      String(firstdigit) +
      String(seconddigit) +
      String(thirddigit) +
      String(fourthdigit);
      
    let history_update = await History.findOneAndUpdate(
      {
        userId: userid,

      },
      {
        status: true,
      }
    );
  }

  return res
    .status(200)
    .json({ response: "Published result successfully", Winners: t });
};

const getHistories = async (req, res) => {
  try{
  let pageno = req.query.pageno;
  let skip_page = pageno * 10;
  let get_all = [];
  let get_Histories = await History.find({ username: req.query.username })
    .skip(skip_page)
    .limit(10);
  for (let i = 0; i < get_Histories.length; i++) {
    let all_date = {
      CreatedAt: moment(get_Histories[i].CreatedAt).format("DD/MM/YYYY"),
      ticket: get_Histories[i].ticket,
      id: get_Histories[i].id,
      ticketCount: get_Histories[i].ticketCount,
    };
    get_all.push(all_date);
  }
  let get_count = await History.find({
    username: req.query.username,
  }).countDocuments();
  console.log(get_all);
  return res.status(200).json({
    response: "Got data successfully",
    data: get_all,
    count: get_count,
  });
}
catch(err){
  console.error("Error",err)
}
};

const addTicketRate = async (req, res) => {
  try{
  let date=new Date()
  let start_date=new Date(date.setHours(date.getHours()+5))
  new Date(date.setMinutes(date.getMinutes()+30))
  let add_count = await TicketRate.create({
    ticketRate: req.body.ticketRate,
    CreatedAt:date
  });

  return res.status(200).json({ response: "Added successfully" });
}
catch(err){
  console.error("Error",err)
}
};

const updateUserId=async (req,res)=>{
  let start_date=new Date(req.query.date);
  let end_date=new Date(start_date.setDate(start_date.getDate()+1))
  let add_count = await TicketRate.updateOne({
    CreatedAt:{$gt:start_date,$lt:end_date},
  },
  {
  userId:parseInt(req.body.userId)});

  return res.status(200).json({ response: "Added successfully" });
}

const addWalletAmount=async(req,res)=>{
  try{
  let date=new Date()
  let start_date=new Date(date.setHours(date.getHours()+5))
  new Date(date.setMinutes(date.getMinutes()+30))
  let wallet_find=await Wallet.findOne({
    userId:req.body.userId
  });
  let wallet;

  if(wallet_find!=null){
    wallet=await Wallet.updateOne({
      userId:req.body.userId
    },{
      amount:parseInt(req.body.amount)
    });
    let wallet_history=await WalletHistory.create(
      {
        amount:parseInt(req.body.amount),
        userId:parseInt(req.body.userId),
        username:req.body.username,
        CreatedAt:date
      }
    )
  }
  else{
   wallet=await Wallet.create({
    amount:parseInt(req.body.amount),
    userId:parseInt(req.body.userId),
    username:req.body.username,
    CreatedAt:date
  });
  let wallet_history=await WalletHistory.create(
    {
      amount:req.body.amount,
      userId:parseInt(req.body.userId),
      username:req.body.username,
      CreatedAt:date
    }
  )
}
  return res.status(200).json({response:"Data inserted successfully"});
}
catch(err){
  console.error("Error",err)
}
}

const addWallettAmount=async(req,res)=>{
  let date=new Date()
  let start_date=new Date(date.setHours(date.getHours()+5))
  new Date(date.setMinutes(date.getMinutes()+30))
  let wallet_find=await Wallet.findOne({
    userId:req.body.userId
  });
  let add_amount;
if(wallet_find!=null){
  add_amount=await Wallet.updateOne({
    userId:req.body.userId
  },{
    amount:wallet_find.amount+parseInt(req.body.amount)
  });
}
else{
  add_amount=await Wallet.create({
    amount:parseInt(req.body.amount),
    userId:parseInt(req.body.userId),
    username:req.body.username,
    CreatedAt:date
  });
}
return res.status(200).json({response:"Data inserted successfully"})
}

const addTicketCount=async (req,res) =>{
  try{
  let start_date=new Date(req.query.date);
  const ticketId = await getNextSequenceValue("ticketId");
  for(let i=0;i<parseInt(req.body.ticketCount);i++){
  let add_count=await Wallet.updateOne({
    userId:req.query.userId
  },{
      ticketCount:req.body.ticketCount,
  });
  }
  return res.status(200).json({response:"updated ticket count successfully"});
}
catch(err){
  console.error("Error",err)
}
}

const getTicketRate = async (req, res) => {
  let start_date = new Date(req.query.date);
  try{
  let get_ticket_rate = await TicketRate.findOne({
    CreatedAt: { $gt: start_date},
  });
  return res
    .status(200)
    .json({ response: "Got Data successfully", data: get_ticket_rate });
}
catch(err){
  console.error("Error",err)
}
};

const getWalletHistory=async(req,res)=>{
  let pageno=req.query.pageno
  let skip_page=pageno*10;
  let arr=[];
  let all_data={};
  try{
  let get_wallet=await WalletHistory.find({
    userId:parseInt(req.query.userId)
  }).skip(skip_page).limit(10);
  for(let i=0;i<get_wallet.length;i++){
    all_data={
      CreatedAt:moment(get_wallet[i].CreatedAt).format("YYYY-MM-DD"),
      amount:get_wallet[i].amount
    }
    arr.push(all_data)
  }
  let get_count=await WalletHistory.find({
    userId:req.query.userId
  }).countDocuments();
  return res.status(200).json({
    response:"Got data successfully",
    data:arr,
    count:get_count
  })
}
catch(err){
  console.error("Error in getting wallet history Please check function",err)
}
}

const getWallet=async(req,res)=>{
  let get_wallet=await Wallet.findOne({
    userId:req.query.userId
  });
  return res.status(200).json({data:get_wallet});
}

async function getNextSequenceValue(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = {
  addTicketDaily,
  get_Minimum,
  getTickets,
  publish_result,
  getHistories,
  addTicketRate,
  getTicketRate,
  addTicketCount,
  addWalletAmount,
  getWalletHistory,
  getWallet,
  addWallettAmount
};
