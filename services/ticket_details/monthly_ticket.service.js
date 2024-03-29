const History = require("../../model/play_history");
const User = require("../../model/User");
const TicketRate = require("../../model/MonthlyTicketRate");

const Result = require("../../model/MonthlyResult");
const PriceRate = require("../../model/MonthlyPriceRate");
const Monthly_Tickets = require("../../model/monthly_tickets");
const monthlyticketrate = require("../../model/MonthlyTicketRate");
const Counter = require("../../model/Counter");
const MonthlyHistory = require("../../model/monthly_master_history");
const MonthlyTicketCount = require("../../model/monthly_ticket_count");
const cron = require("node-cron");

// create Monthly_Tickets
const addTicketMonthly = async (req, res) => {
  try {
    const ticketId = await getNextSequenceValue("ticketId");

    let user_find = await User.findOne({
      userId: parseInt(req.body.userId),
    });

    let wallet_u = await MonthlyTicketCount.findOne({
      userId: parseInt(req.body.userId),
    });
    if (wallet_u.monthlyTicketCount > 0) {
      await MonthlyTicketCount.updateOne(
        {
          userId: parseInt(req.body.userId),
        },
        {
          monthlyTicketCount: wallet_u.monthlyTicketCount - 1,
        }
      );
      let date = new Date();
      new Date(date.setHours(date.getHours() + 5));
      new Date(date.setMinutes(date.getMinutes() + 30));
      await Monthly_Tickets.create({
        userId: parseInt(req.body.userId),
        ticketId: ticketId,
        ticket: req.body.ticket,
        CreatedAt: date,
      });
    } else {
      console.log("tickets you have bought is over please buy more and try");
    }

    await History.create({
      username: user_find.username,
      userId: parseInt(req.body.userId),
      ticket: req.body.ticket,
      ticketId: ticketId,
    });
    res.status(200).json({ response: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ response: "Error inserting data" });
  }
};

// Add Monthly_Tickets count
const addMonthlyTicketCount = async (req, res) => {
  try {
    let start_date = new Date(req.query.date);
    console.log(req.body.ticketCount);
    const ticketId = await getNextSequenceValue("ticketId");

    for (let i = 0; i < parseInt(req.body.ticketCount); i++) {
      let find_wallet = await MonthlyTicketCount.findOne({
        userId: req.query.userId,
      });

      if (find_wallet.alreadyMonthlyTicketCount <= 15) {
        let add_count = await MonthlyTicketCount.updateOne(
          {
            userId: req.query.userId,
          },
          {
            monthlyTicketCount:
              find_wallet.monthlyTicketCount + parseInt(req.body.ticketCount),
            alreadyMonthlyTicketCount:
              find_wallet.alreadyMonthlyTicketCount +
              parseInt(req.body.ticketCount),

            ticketCount: parseInt(req.body.ticketCount),
            alreadyTicketCount:
              find_wallet.alreadyTicketCount + parseInt(req.body.ticketCount),
          }
        );
        return res
          .status(200)
          .json({ response: "updated ticket count successfully" });
      } else {
      }
    }
  } catch (err) {
    console.error("Error", err);
    console.log("Only 15 tickets can be bought");
    return res.status(500).json({ response: "Only 15 tickets can be bought" });
  }
};

const monthlyResultTicket = async (req, res) => {
  try {
    let userid;

    let ticket_data = await Monthly_Tickets.find({});

    await PriceRate.findOne({});

    const tmp_ticket = await previousTicketRate.findOne({});

    const result = await Result.findOne({});

    userid = ticket_data[0].userId;

    if (tmp_ticket.previous_montly_ticket_rate_called === null) {
      for (let i = 0; i < ticket_data.length; i++) {
        userid = ticket_data[i].userId;
        console.log(ticket_data[i].ticket, result.result_ticket_1);
        if (
          ticket_data[i].ticket === result.result_ticket_1 ||
          result.result_ticket_2 ||
          result.result_ticket_3
        ) {
          await Monthly_Tickets.findOneAndUpdate(
            {
              ticketId: ticket_data[i].ticketId,
            },
            {
              "ticket.0.status": "true",
              "ticket.1.status": "true",
              "ticket.2.status": "true",
              "ticket.3.status": "true",
            }
          );

          await MonthlyHistory.updateMany(
            {
              ticketId: parseInt(ticket_data[i].ticketId),
            },
            {
              "ticket.0.status": "true",
              "ticket.1.status": "true",
              "ticket.2.status": "true",
              "ticket.3.status": "true",
            }
          );

          await History.updateMany(
            {
              ticketId: parseInt(ticket_data[i].ticketId),
            },
            {
              "ticket.0.status": "true",
              "ticket.1.status": "true",
              "ticket.2.status": "true",
              "ticket.3.status": "true",
            }
          );
        } else {
          await Monthly_Tickets.findOneAndUpdate(
            {
              ticketId: ticket_data[i].ticketId,
            },
            {
              "ticket.0.status": "false",
              "ticket.1.status": "false",
              "ticket.2.status": "false",
              "ticket.3.status": "false",
            }
          );

          await MonthlyHistory.updateMany(
            {
              ticketId: parseInt(ticket_data[i].ticketId),
            },
            {
              "ticket.0.status": "false",
              "ticket.1.status": "false",
              "ticket.2.status": "false",
              "ticket.3.status": "false",
            }
          );

          await History.updateMany(
            {
              ticketId: parseInt(ticket_data[i].ticketId),
            },
            {
              "ticket.0.status": "false",
              "ticket.1.status": "false",
              "ticket.2.status": "false",
              "ticket.3.status": "false",
            }
          );
        }
      }

      const new_ticket_rate = await TicketRate.findOne({});

      await previousTicketRate.updateMany({
        previous_monthly_ticket_rate: new_ticket_rate.ticketRate,
        previous_monthly_ticket_rate_called: 1,
      });
    }

    let get_tickets = await Monthly_Tickets.find({
      userId: userid,
    });

    return res.status(200).json({ response: "success", data: get_tickets });
  } catch (err) {
    console.log(err);
  }
};

// Get ticket's
const getMonthlyTickets = async (req, res) => {
  try {
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let start_date = new Date(req.query.date);
    let date = new Date(req.query.date);

    let get_tickets = await Monthly_Tickets.find({
      userId: req.query.userId,
    });

    let ticket_count = await Monthly_Tickets.find({
      userId: req.query.userId,
    }).countDocuments();

    return res.status(200).json({
      response: "Got data successfully",
      data: get_tickets,
      count: ticket_count,
    });
  } catch (err) {
    console.error("Error", err);
  }
};

// Minimum filter
const getMinimumMonthlyTicket = async (req, res) => {
  let get_data;
  let firstdigit_arr = [];
  let seconddigit_arr = [];
  let thirddigit_arr = [];
  let fourthdigit_arr = [];
  let lowestValueArr = [];
  let zeroth = 0;
  let oneth = 0;
  let twoth = 0;
  let threeth = 0;
  let fourth = 0;
  let fifth = 0;
  let sixth = 0;
  let seventh = 0;
  let eigth = 0;
  let nineth = 0;

  let a;
  let all_data;
  let digit = parseInt(req.query.digit);
  let digit1 = parseInt(req.query.digit1);
  let digit2 = parseInt(req.query.digit2);
  let digit3 = parseInt(req.query.digit3);
  const filter_by_value = parseInt(req.query.filter_value);

  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  start_date.setDate(start_date.getDate() - 1);
  start_date.setHours(17, 0, 0, 0);
  date.setHours(17, 0, 0, 0);

  get_data = await Monthly_Tickets.find({});

  for (let i = 0; i < get_data.length; i++) {
    if (digit === 1) {
      firstdigit_arr.push(get_data[i].ticket[0].digit);
    }

    if (digit1 === 2 && get_data[i].ticket[0].digit === filter_by_value) {
      seconddigit_arr.push(get_data[i].ticket[1].digit);
    }
    if (digit2 === 3 && get_data[i].ticket[1].digit === filter_by_value) {
      thirddigit_arr.push(get_data[i].ticket[2].digit);
    }
    if (digit3 === 4 && get_data[i].ticket[2].digit === filter_by_value) {
      fourthdigit_arr.push(get_data[i].ticket[3].digit);
    }
  }

  if (digit === 1) {
    for (let j = 0; j < firstdigit_arr.length; j++) {
      if (firstdigit_arr[j] == 0) {
        zeroth += 1;
      } else if (firstdigit_arr[j] == 1) {
        oneth += 1;
      } else if (firstdigit_arr[j] == 2) {
        twoth += 1;
      } else if (firstdigit_arr[j] == 3) {
        threeth += 1;
      } else if (firstdigit_arr[j] == 4) {
        fourth += 1;
      } else if (firstdigit_arr[j] == 5) {
        fifth += 1;
      } else if (firstdigit_arr[j] == 6) {
        sixth += 1;
      } else if (firstdigit_arr[j] == 7) {
        seventh += 1;
      } else if (firstdigit_arr[j] == 8) {
        eigth += 1;
      } else if (firstdigit_arr[j] == 9) {
        nineth += 1;
      }
    }
  }
  if (digit1 === 2) {
    oneth = 0;
    zeroth = 0;
    twoth = 0;
    threeth = 0;
    fourth = 0;
    fifth = 0;
    sixth = 0;
    seventh = 0;
    eigth = 0;
    nineth = 0;
    for (let j = 0; j < seconddigit_arr.length; j++) {
      if (seconddigit_arr[j] == 0) {
        zeroth += 1;
      } else if (seconddigit_arr[j] == 1) {
        oneth += 1;
      } else if (seconddigit_arr[j] == 2) {
        twoth += 1;
      } else if (seconddigit_arr[j] == 3) {
        threeth += 1;
      } else if (seconddigit_arr[j] == 4) {
        fourth += 1;
      } else if (seconddigit_arr[j] == 5) {
        fifth += 1;
      } else if (seconddigit_arr[j] == 6) {
        sixth += 1;
      } else if (seconddigit_arr[j] == 7) {
        seventh += 1;
      } else if (seconddigit_arr[j] == 8) {
        eigth += 1;
      } else if (seconddigit_arr[j] == 9) {
        nineth += 1;
      }
    }
  }
  if (digit2 === 3) {
    oneth = 0;
    zeroth = 0;
    twoth = 0;
    threeth = 0;
    fourth = 0;
    fifth = 0;
    sixth = 0;
    seventh = 0;
    eigth = 0;
    nineth = 0;
    for (let j = 0; j < thirddigit_arr.length; j++) {
      if (thirddigit_arr[j] == 0) {
        zeroth += 1;
      } else if (thirddigit_arr[j] == 1) {
        oneth += 1;
      } else if (thirddigit_arr[j] == 2) {
        twoth += 1;
      } else if (thirddigit_arr[j] == 3) {
        threeth += 1;
      } else if (thirddigit_arr[j] == 4) {
        fourth += 1;
      } else if (thirddigit_arr[j] == 5) {
        fifth += 1;
      } else if (thirddigit_arr[j] == 6) {
        sixth += 1;
      } else if (thirddigit_arr[j] == 7) {
        seventh += 1;
      } else if (thirddigit_arr[j] == 8) {
        eigth += 1;
      } else if (thirddigit_arr[j] == 9) {
        nineth += 1;
      }
    }
  }
  if (digit3 === 4) {
    oneth = 0;
    zeroth = 0;
    twoth = 0;
    threeth = 0;
    fourth = 0;
    fifth = 0;
    sixth = 0;
    seventh = 0;
    eigth = 0;
    nineth = 0;
    for (let j = 0; j < fourthdigit_arr.length; j++) {
      if (fourthdigit_arr[j] == 0) {
        zeroth += 1;
      } else if (fourthdigit_arr[j] == 1) {
        oneth += 1;
      } else if (fourthdigit_arr[j] == 2) {
        twoth += 1;
      } else if (fourthdigit_arr[j] == 3) {
        threeth += 1;
      } else if (fourthdigit_arr[j] == 4) {
        fourth += 1;
      } else if (fourthdigit_arr[j] == 5) {
        fifth += 1;
      } else if (fourthdigit_arr[j] == 6) {
        sixth += 1;
      } else if (fourthdigit_arr[j] == 7) {
        seventh += 1;
      } else if (fourthdigit_arr[j] == 8) {
        eigth += 1;
      } else if (fourthdigit_arr[j] == 9) {
        nineth += 1;
      }
    }
  }

  lowestValueArr.push(
    oneth,
    zeroth,
    twoth,
    threeth,
    fourth,
    fifth,
    sixth,
    seventh,
    eigth,
    nineth
  );

  all_data = [
    {
      id: 0,
      count: zeroth,
    },
    {
      id: 1,
      count: oneth,
    },
    { id: 2, count: twoth },
    {
      id: 3,
      count: threeth,
    },
    {
      id: 4,
      count: fourth,
    },
    {
      id: 5,
      count: fifth,
    },
    {
      id: 6,
      count: sixth,
    },
    {
      id: 7,
      count: seventh,
    },
    {
      id: 8,
      count: eigth,
    },
    {
      id: 9,
      count: nineth,
    },
  ];

  a = Math.min.apply(Math, lowestValueArr);
  let b;
  for (let k = 0; k < all_data.length; k++) {
    if (all_data[k].count == a) {
      b = all_data[k].id;
    }
  }
  return res.status(200).json({
    response: "Got data successfully",
    data: all_data,
    LowestValue: b,
  });
};

const monthlyPublishTicketResult = async (req, res) => {
  let t = 0;
  let date1 = new Date();
  new Date(date1.setHours(date1.getHours() + 5));
  new Date(date1.setMinutes(date1.getMinutes() + 30));
  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  start_date.setDate(start_date.getDate() - 1);
  start_date.setHours(17, 0, 0, 0);
  date.setHours(17, 0, 0, 0);

  await Result.create({
    winning_ticket: [
      {
        result_ticket_1: req.body.ticket_1,
        result_ticket_2: req.body.ticket_2,
        result_ticket_3: req.body.ticket_3,
      },
    ],

    CreatedAt: date1,
  });

  return res
    .status(200)
    .json({ response: "Published result successfully", Winners: t });
};

// get buyed monthly ticket count
const getMonthlyBuyedTicketCount = async (req, res) => {
  try {
    let get_ticket_count;

    get_ticket_count = await MonthlyTicketCount.findOne({
      userId: req.query.userId,
    });

    return res.status(200).json({ data: get_ticket_count });
  } catch (err) {
    console.log(err);
  }
};

// Monthly ticket rate publish
const addMonthlyTicketRate = async (req, res) => {
  try {
    let date = new Date();
    new Date(date.setHours(date.getHours() + 5));
    new Date(date.setMinutes(date.getMinutes() + 30));
    let add_count = await TicketRate.create({
      ticketRate: req.body.ticketRate,
      CreatedAt: date,
    });

    return res.status(200).json({ response: "Added successfully" });
  } catch (err) {
    console.error("Error", err);
  }
};

//  Get Monthly ticket rate
const getMonthlyTicketRate = async (req, res) => {
  new Date(req.query.date);
  new Date(req.query.date);

  try {
    let get_ticket_rate = await monthlyticketrate.findOne({});

    return res
      .status(200)
      .json({ response: "Got Data successfully", data: get_ticket_rate });
  } catch (err) {
    console.error("Error", err);
  }
};

// Get Monthly winner's data
const getMonthlyWinner = async (req, res) => {
  try {
    let user_find;
    let arr = [];
    let get_wallet = await Monthly_Tickets.find({});
    for (let i = 0; i < get_wallet.length; i++) {
      console.log(get_wallet[i]);
      if (
        get_wallet[i].ticket[0].status == "true" &&
        get_wallet[i].ticket[1].status == "true" &&
        get_wallet[i].ticket[2].status == "true" &&
        get_wallet[i].ticket[3].status == "true"
      ) {
        user_find = await User.findOne({
          userId: get_wallet[i].userId,
        });
        arr.push(user_find.username);
      }
    }

    return res.status(200).json({ data: arr });
  } catch (err) {
    console.error("Error");
  }
};

// Publish Monthly price rate
const addMonthlyPriceRate = async (req, res) => {
  try {
    let date = new Date();
    let start_date = new Date(date.setHours(date.getHours() + 5));
    new Date(date.setMinutes(date.getMinutes() + 30));
    let update_rate = await PriceRate.create({
      priceRate_splitup: req.body.splitup,
      CreatedAt: date,
    });
    res.status(200).json("created successfully");
  } catch (error) {
    console.log(error);
  }
};

//   Get Monthly Price Rate
const getMonthlyPriceRate = async (req, res) => {
  try {
    new Date(req.query.date);
    new Date(req.query.date);

    let update_rate = await PriceRate.findOne({});
    res
      .status(200)
      .json({ response: "Got data successfully", data: update_rate });
  } catch (error) {
    console.log(error);
  }
};

// Result
const getMonthlyResult = async (req, res) => {
  try {
    let data_get = await Result.find({});

    res.status(200).json({ response: "Got data successfully", data: data_get });
  } catch (error) {
    console.error(error);
  }
};

const getMonthlyHistory = async (req, res) => {
  try {
    let get_all = [];
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let get_Histories = await MonthlyHistory.find({}).skip(skip_page).limit(10);
    for (let i = 0; i < get_Histories.length; i++) {
      let find_user = await User.findOne({
        username: get_Histories[i].username,
      });
      let all_date = {
        CreatedAt: moment(get_Histories[i].CreatedAt).format("DD/MM/YYYY"),
        ticket: get_Histories[i].ticket,
        id: get_Histories[i].id,
        ticketCount: get_Histories[i].ticketCount,
        username: get_Histories[i].username + `(${find_user.referralId})`,
      };
      get_all.push(all_date);
    }
    let data_count = await MonthlyHistory.find().countDocuments();
    res.status(200).json({
      response: "Got data successfully",
      data: get_all,
      count: data_count,
    });
  } catch (error) {
    console.error(error);
  }
};

cron.schedule("0 0 0 28-31 * *", async () => {
  console.log("cron running at  every last day of the month ");
  await Monthly_Tickets.deleteMany({});
  await monthlyticketrate.deleteMany({});
  await PriceRate.deleteMany({});
});

cron.schedule("0 0 0 28-31 * *", async () => {
  console.log("cron running at every last day of the month");
  await Result.deleteMany({});
});

async function getNextSequenceValue(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = {
  addTicketMonthly,
  getMonthlyTickets,
  getMinimumMonthlyTicket,
  monthlyPublishTicketResult,
  addMonthlyTicketRate,
  getMonthlyTicketRate,
  addMonthlyTicketCount,
  getMonthlyPriceRate,
  addMonthlyPriceRate,
  getMonthlyWinner,
  getMonthlyBuyedTicketCount,
  getMonthlyResult,
  getMonthlyHistory,
  monthlyResultTicket,
};
