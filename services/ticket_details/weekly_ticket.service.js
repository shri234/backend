const History = require("../../model/play_history");
const User = require("../../model/User");
const TicketRate = require("../../model/WeeklyTicketRate");
const Wallet = require("../../model/wallet");
const WeeklyResult = require("../../model/WeeklyResult");
const PriceRate = require("../../model/weekly_price_rate");
const Weekly_Tickets = require("../../model/weekly_ticket");

const Counter = require("../../model/Counter");
const WeeklyHistory = require("../../model/weekly_master_history");
const WeeklyTicketCount = require("../../model/weekly_ticket_count");
const previousTicketRate = require("../../model/previous_ticket_rate");

const moment = require("moment");
const cron = require("node-cron");

// create Weekly_Tickets
const addTicketWeekly = async (req, res) => {
  try {
    let date = new Date();
    const ticketId = await getNextSequenceValue("ticketId");

    let user_find = await User.findOne({
      userId: parseInt(req.body.userId),
    });

    let wallet_u = await WeeklyTicketCount.findOne({
      userId: parseInt(req.body.userId),
    });
    if (wallet_u.weeklyTicketCount > 0) {
      let wallet_update = await WeeklyTicketCount.updateOne(
        {
          userId: parseInt(req.body.userId),
        },
        {
          weeklyTicketCount: wallet_u.weeklyTicketCount - 1,
        }
      );
      let date = new Date();
      let start_date = new Date(date.setHours(date.getHours() + 5));
      new Date(date.setMinutes(date.getMinutes() + 30));
      const add_ticket = await Weekly_Tickets.create({
        userId: parseInt(req.body.userId),
        ticketId: ticketId,
        ticket: req.body.ticket,
        CreatedAt: date,
      });
    } else {
      console.log("tickets you have bought is over please buy more and try");
    }

    const id = await getNextSequenceValue("id");
    let user_history = await History.create({
      username: user_find.username,
      userId: parseInt(req.body.userId),
      ticket: req.body.ticket,
      id: id,
    });
    let weekly_history = await WeeklyHistory.create({
      username: user_find.username,
      userId: parseInt(req.body.userId),
      ticket: req.body.ticket,
      ticketId: ticketId,
      CreatedAt: date,
    });
    res.status(200).json({ response: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ response: "Error inserting data" });
  }
};

// Get ticket's
const getWeeklyTickets = async (req, res) => {
  try {
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let start_date = new Date(req.query.date);
    let date = new Date(req.query.date);

    let get_tickets = await Weekly_Tickets.find({
      userId: req.query.userId,
    });

    let ticket_count = await Weekly_Tickets.find({
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
const getMinimumWeeklyTicket = async (req, res) => {
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

  get_data = await Weekly_Tickets.find({});

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

const addWeeklyPriceAmountToWallet = async (req, res) => {
  try {
    let firstdigit;
    let userid;
    let seconddigit;
    let thirddigit;
    let fourthdigit;
    let pricerate_1;
    let pricerate1;
    let pricerate_2;
    let pricerate2;
    let pricerate_3;
    let pricerate_4;
    let pricerate4;
    let pricerate3;
    let t = 0;

    let ticket_data = await Weekly_Tickets.find({});

    let price_rate = await PriceRate.findOne({});

    const tmp_ticket = await previousTicketRate.findOne({});
    const result = await WeeklyResult.findOne({});
    userid = ticket_data[0].userId;
    const tmp_result = Array.from(result.result_ticket).map(Number);
    if (tmp_ticket.previous_weekly_ticket_rate_called === null) {
      for (let i = 0; i < ticket_data.length; i++) {
        userid = ticket_data[i].userId;
        for (let j = 0; j < 4; j++) {
          if (j === 0) {
            if (ticket_data[i].ticket[j].digit === parseInt(tmp_result[j])) {
              firstdigit = tmp_result[j];
              if (price_rate != null) {
                pricerate_1 = price_rate.priceRate_splitup[0].first_digit;
                pricerate1 =
                  pricerate_1 * tmp_ticket.previous_daily_ticket_rate;
              }

              let wallet_find = await Wallet.findOne({
                userId: parseInt(ticket_data[i].userId),
              });

              await Wallet.findOneAndUpdate(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  amount: wallet_find.amount + pricerate1,
                }
              );

              await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.0.status": "true",
                }
              );
              await DailyHistory.updateMany(
                {  
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.0.status": "true",
                }
              );

              await History.updateMany(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  "ticket.0.status": "true",
                }
              );
            } else {
              await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.0.status": "false",
                }
              );
              await DailyHistory.updateMany(
                {
                   ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.0.status": "false",
                }
              );
              await History.updateMany(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  "ticket.0.status": "false",
                }
              );
            }
          } else if (j === 1) {
            if (firstdigit !== undefined) {
              if (ticket_data[i].ticket[j].digit === parseInt(tmp_result[j])) {
                seconddigit = tmp_result[j];
                if (price_rate != null) {
                  pricerate_2 = price_rate.priceRate_splitup[0].second_digit;
                  pricerate2 =
                    pricerate_2 * tmp_ticket.previous_daily_ticket_rate;
                }

                let wallet_find = await Wallet.findOne({
                  userId: parseInt(ticket_data[i].userId),
                });
                await Wallet.findOneAndUpdate(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    amount: wallet_find.amount + pricerate2,
                  }
                );
                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.1.status": "true",
                  }
                );
                await DailyHistory.updateMany(
                  {
                     ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.1.status": "true",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.1.status": "true",
                  }
                );
              } else {
                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.1.status": "false",
                  }
                );
                await DailyHistory.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.1.status": "false",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.1.status": "false",
                  }
                );
              }
            }
          } else if (j === 2) {
            if (seconddigit != undefined) {
              if (ticket_data[i].ticket[j].digit === parseInt(tmp_result[j])) {
                thirddigit = tmp_result[j];
                if (price_rate != null) {
                  pricerate_3 = price_rate.priceRate_splitup[0].third_digit;
                  pricerate3 =
                    pricerate_3 * tmp_ticket.previous_daily_ticket_rate;
                }
                let wallet_find = await Wallet.findOne({
                  userId: parseInt(ticket_data[i].userId),
                });

                await Wallet.findOneAndUpdate(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    amount: wallet_find.amount + pricerate3,
                  }
                );

                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.2.status": "true",
                  }
                );
                await DailyHistory.updateMany(
                  {
                     ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.2.status": "true",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.2.status": "true",
                  }
                );
              } else {
                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.2.status": "false",
                  }
                );
                await DailyHistory.updateMany(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.2.status": "false",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.2.status": "false",
                  }
                );
              }
            }
          } else if (j === 3) {
            if (thirddigit != undefined) {
              if (ticket_data[i].ticket[j].digit === parseInt(tmp_result[j])) {
                if (price_rate != null) {
                  pricerate_4 = price_rate.priceRate_splitup[0].fourth_digit;
                  pricerate4 =
                    pricerate_4 * tmp_ticket.previous_daily_ticket_rate;
                }
                let wallet_find = await Wallet.findOne({
                  userId: parseInt(ticket_data[i].userId),
                });

                await Wallet.findOneAndUpdate(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    amount: wallet_find.amount + pricerate4,
                  }
                );

                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.3.status": "true",
                  }
                );
                await DailyHistory.updateMany(
                  {
                      ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.3.status": "true",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.3.status": "true",
                  }
                );
              } else {
                await Ticket.findOneAndUpdate(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.3.status": "false",
                  }
                );
                await DailyHistory.updateMany(
                  {
                    ticketId: ticket_data[i].ticketId,
                  },
                  {
                    "ticket.3.status": "false",
                  }
                );
                await History.updateMany(
                  {
                    userId: parseInt(ticket_data[i].userId),
                  },
                  {
                    "ticket.3.status": "false",
                  }
                );
              }
            }
          }
        }
        if (
          firstdigit != undefined &&
          seconddigit != undefined &&
          thirddigit != undefined &&
          fourthdigit != undefined
        ) {
          t += 1;
        }

        firstdigit = undefined;
        seconddigit = undefined;
        thirddigit = undefined;
        fourthdigit = undefined;
      }

      const new_ticket_rate = await TicketRate.findOne({});

      await previousTicketRate.updateMany({
        previous_weekly_ticket_rate: new_ticket_rate.ticketRate,
        previous_weekly_ticket_rate_called: 1,
      });
    }

    let get_tickets = await Weekly_Tickets.find({
      userId: userid,
    });
    return res.status(200).json({ response: "success", data: get_tickets });
  } catch (err) {
    console.log(err);
  }
};

// Weekly publish
const weeklyPublishTicketResult = async (req, res) => {
  let t = 0;
  let date1 = new Date();
  let start_date1 = new Date(date1.setHours(date1.getHours() + 5));
  new Date(date1.setMinutes(date1.getMinutes() + 30));
  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  start_date.setDate(start_date.getDate() - 1);
  start_date.setHours(17, 0, 0, 0);
  date.setHours(17, 0, 0, 0);
  let ticket_rate = await TicketRate.findOne({});
  await previousTicketRate.updateMany({
    previous_weekly_ticket_rate: ticket_rate.ticketRate,
    previous_weekly_ticket_rate_called: null,
  });
  let result_add = await WeeklyResult.create({
    result_ticket:
      req.body[0].digit +
      req.body[1].digit +
      req.body[2].digit +
      req.body[3].digit,
    CreatedAt: date1,
  });

  return res
    .status(200)
    .json({ response: "Published result successfully", Winners: t });
};

// Weekly ticket rate publish
const addWeeklyTicketRate = async (req, res) => {
  try {
    let date = new Date();
    let start_date = new Date(date.setHours(date.getHours() + 5));
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

//  Get Weekly ticket rate
const getWeeklyTicketRate = async (req, res) => {
  try {
    let get_ticket_rate = await TicketRate.findOne({});

    return res
      .status(200)
      .json({ response: "Got Data successfully", data: get_ticket_rate });
  } catch (err) {
    console.error("Error", err);
  }
};

// get Buyed weekly line data count
const getWeeklyBuyedTicketCount = async (req, res) => {
  try {
    let get_ticket_count;
    if (req.query) {
      get_ticket_count = await WeeklyTicketCount.findOne({
        userId: req.query.userId,
      });
    } else {
      get_ticket_count = await WeeklyTicketCount.findOne({
        userId: userId,
      });
    }

    return res.status(200).json({ data: get_ticket_count });
  } catch (err) {
    console.log(err);
  }
};

// Add Weekly_Tickets count
const addWeeklyTicketCount = async (req, res) => {
  try {
    let start_date = new Date(req.query.date);
    const ticketId = await getNextSequenceValue("ticketId");
    for (let i = 0; i < parseInt(req.body.ticketCount); i++) {
      let find_wallet = await WeeklyTicketCount.findOne({
        userId: req.query.userId,
      });
      if (find_wallet.alreadyWeeklyTicketCount <= 15) {
        let add_count = await WeeklyTicketCount.updateOne(
          {
            userId: req.query.userId,
          },
          {
            weeklyTicketCount:
              find_wallet.weeklyTicketCount + parseInt(req.body.ticketCount),
            alreadyWeeklyTicketCount:
              find_wallet.alreadyWeeklyTicketCount +
              parseInt(req.body.ticketCount),
          }
        );
        return res
          .status(200)
          .json({ response: "added ticket count successfully" });
      } else {
      }
    }
  } catch (err) {
    console.log("Only 15 tickets can be bought");
    return res.status(500).json({ response: "Only 15 tickets can be bought" });
    console.error("Error", err);
  }
};

// Get Weekly winner's data
const getWeeklyWinner = async (req, res) => {
  try {
    let all_data = {};
    let user_find;
    let arr = [];
    let get_wallet = await Weekly_Tickets.find({});
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

// Publish weekly price rate
const addWeeklyPriceRate = async (req, res) => {
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

//   Get Weekly Price Rate
const getWeeklyPriceRate = async (req, res) => {
  try {
    let start_date = new Date(req.query.date);
    let date = new Date(req.query.date);

    let update_rate = await PriceRate.findOne({});
    res
      .status(200)
      .json({ response: "Got data successfully", data: update_rate });
  } catch (error) {
    console.log(error);
  }
};

// Result
const getWeeklyResult = async (req, res) => {
  try {
    let data_get = await WeeklyResult.findOne({});
    // clients1.forEach((client) => {
    //   client.write(`data: ${JSON.stringify(data_get)}\n\n`);
    // });
    res.status(200).json({ response: "Got data successfully", data: data_get });
  } catch (error) {
    console.error(error);
  }
};

const getWeeklyHistory = async (req, res) => {
  try {
    let get_all = [];
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let get_Histories = await WeeklyHistory.find({}).skip(skip_page).limit(10);
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
    let data_count = await WeeklyHistory.find().countDocuments();
    res.status(200).json({
      response: "Got data successfully",
      data: get_all,
      count: data_count,
    });
  } catch (error) {
    console.error(error);
  }
};

cron.schedule("0 18 * * FRI", async () => {
  console.log("cron running at 7 pm everyday");
  await TicketRate.deleteMany({});
  await PriceRate.deleteMany({});
  await WeeklyTicketCount.updateMany({
    alreadyWeeklyTicketCount: 0,
    weeklyTicketCount: 0,
  });
});

cron.schedule("0 19 * * FRI", async () => {
  console.log("cron running at 7 pm everyday");

  await WeeklyHistory.deleteMany({});
});

cron.schedule("0 20 * * FRI", async () => {
  console.log("cron running at 8 pm everyday");
    await Weekly_Tickets.deleteMany({});
  await WeeklyResult.deleteMany({});
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
  addTicketWeekly,
  getWeeklyTickets,
  getMinimumWeeklyTicket,
  weeklyPublishTicketResult,
  addWeeklyTicketRate,
  getWeeklyTicketRate,
  addWeeklyTicketCount,
  getWeeklyPriceRate,
  addWeeklyPriceRate,
  getWeeklyWinner,
  getWeeklyBuyedTicketCount,
  getWeeklyResult,
  getWeeklyHistory,
  addWeeklyPriceAmountToWallet,
};
