const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Ticket = require("../../model/tickets");
const Counter = require("../../model/Counter");
const History = require("../../model/play_history");
const User = require("../../model/User");
const TicketRate = require("../../model/ticket_rate");
const moment = require("moment");
const WalletHistory = require("../../model/wallet_history");
const Wallet = require("../../model/wallet");
const Result = require("../../model/result");
const PriceRate = require("../../model/price_rate");
const cron = require("node-cron");
const monthlyresult = require("../../model/MonthlyResult");
const weeklyresult = require("../../model/WeeklyResult");
const DailyTicketCount = require("../../model/daily_ticket_count");
const DailyHistory = require("../../model/daily_master_history");
const WeeklyTicketCount = require("../../model/weekly_ticket_count");
const MonthlyTicketCount = require("../../model/monthly_ticket_count");

const addTicketDaily = async (req, res) => {
  try {
    let date = new Date();
    const ticketId = await getNextSequenceValue("ticketId");

    let user_find = await User.findOne({
      userId: parseInt(req.body.userId),
    });

    let wallet_u = await DailyTicketCount.findOne({
      userId: parseInt(req.body.userId),
    });
    if (wallet_u.dailyTicketCount > 0) {
      let wallet_update = await DailyTicketCount.updateOne(
        {
          userId: parseInt(req.body.userId),
        },
        {
          dailyTicketCount: wallet_u.dailyTicketCount - 1,
        }
      );
      let date = new Date();
      let start_date = new Date(date.setHours(date.getHours() + 5));
      new Date(date.setMinutes(date.getMinutes() + 30));
      const add_ticket = await Ticket.create({
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
    let add_history = await DailyHistory.create({
      username: user_find.username,
      userId: parseInt(req.body.userId),
      ticket: req.body.ticket,
      id: id,
      CreatedAt: date,
    });
    res.status(200).json({ response: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ response: "Error inserting data" });
  }
};

const getMinimum = async (req, res) => {
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
  let tmp_digit = parseInt(req.query.value1);
  let tmp_digit1 = parseInt(req.query.value2);
  let tmp_digit3 = parseInt(req.query.value3);
  console.log(tmp_digit, tmp_digit1, tmp_digit3);
  const filter_by_value = parseInt(req.query.filter_value);

  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  start_date.setDate(start_date.getDate() - 1);
  start_date.setHours(17, 0, 0, 0);
  date.setHours(17, 0, 0, 0);

  get_data = await Ticket.find({});

  for (let i = 0; i < get_data.length; i++) {
    if (digit === 1) {
      firstdigit_arr.push(get_data[i].ticket[0].digit);
    }

    if (digit1 === 2 && get_data[i].ticket[0].digit === tmp_digit) {
      seconddigit_arr.push(get_data[i].ticket[1].digit);
    }
    if (
      digit2 === 3 &&
      get_data[i].ticket[0].digit === tmp_digit &&
      get_data[i].ticket[1].digit === tmp_digit1
    ) {
      thirddigit_arr.push(get_data[i].ticket[2].digit);
    }
    if (
      digit3 === 4 &&
      get_data[i].ticket[0].digit === tmp_digit &&
      get_data[i].ticket[1].digit === tmp_digit1 &&
      get_data[i].ticket[2].digit === tmp_digit3
    ) {
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

const getTickets = async (req, res) => {
  try {
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let start_date = new Date(req.query.date);
    let date = new Date(req.query.date);

    let get_tickets = await Ticket.find({
      userId: req.query.userId,
    });

    let ticket_count = await Ticket.find({
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

const publish_result = async (req, res) => {
  try {
    let body_data = req.body;
    let userid;
    let firstdigit;
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
    let date1 = new Date();
    let start_date1 = new Date(date1.setHours(date1.getHours() + 5));
    new Date(date1.setMinutes(date1.getMinutes() + 30));
    let start_date = new Date(req.query.date);
    let date = new Date(req.query.date);

    start_date.setDate(start_date.getDate() - 1);
    start_date.setHours(17, 0, 0, 0);
    date.setHours(17, 0, 0, 0);
    console.log(start_date, date);
    let ticket_data = await Ticket.find({});
    console.log(-1);
    let price_rate = await PriceRate.findOne({});
    console.log(0);
    let ticket_rate = await TicketRate.findOne({});
    console.log(1);
    let result_add = await Result.create({
      result_ticket:
        req.body[0].digit +
        req.body[1].digit +
        req.body[2].digit +
        req.body[3].digit,
      CreatedAt: date1,
    });

    console.log(price_rate.priceRate_splitup, "pricerate");
    for (let i = 0; i < ticket_data.length; i++) {
      userid = ticket_data[i].userId;
      for (let j = 0; j < 4; j++) {
        if (j === 0) {
          if (ticket_data[i].ticket[j].digit === parseInt(req.body[j].digit)) {
            firstdigit = req.body[j].digit;
            if (price_rate != null) {
              let pricerate11 = price_rate.priceRate_splitup;
              pricerate_1 = price_rate.priceRate_splitup[0].first_digit;
              pricerate1 = pricerate_1 * ticket_rate.ticketRate;
            }

            let wallet_find = await Wallet.findOne({
              userId: parseInt(ticket_data[i].userId),
            });

            let addon_wallet = await Wallet.findOneAndUpdate(
              {
                userId: parseInt(ticket_data[i].userId),
              },
              {
                amount: wallet_find.amount + pricerate1,
              }
            );

            let ticket_update = await Ticket.findOneAndUpdate(
              {
                ticketId: ticket_data[i].ticketId,
              },
              {
                "ticket.0.status": "true",
              }
            );
          } else {
            let ticket_update = await Ticket.findOneAndUpdate(
              {
                ticketId: ticket_data[i].ticketId,
              },
              {
                "ticket.0.status": "false",
              }
            );
          }
        } else if (j === 1) {
          if (firstdigit !== undefined) {
            if (
              ticket_data[i].ticket[j].digit === parseInt(req.body[j].digit)
            ) {
              seconddigit = req.body[j].digit;
              if (price_rate != null) {
                pricerate_2 = price_rate.priceRate_splitup[0].seoncd_digit;
                pricerate2 = pricerate_2 * ticket_rate.ticketRate;
              }

              let wallet_find = await Wallet.findOne({
                userId: parseInt(ticket_data[i].userId),
              });
              let addon_wallet = await Wallet.findOneAndUpdate(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  amount: wallet_find.amount + pricerate2,
                }
              );
              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.1.status": "true",
                }
              );
            } else {
              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.1.status": "false",
                }
              );
            }
          }
        } else if (j === 2) {
          if (seconddigit != undefined) {
            if (
              ticket_data[i].ticket[j].digit === parseInt(req.body[j].digit)
            ) {
              thirddigit = req.body[j].digit;
              if (price_rate != null) {
                pricerate_3 = price_rate.priceRate_splitup[0].third_digit;
                pricerate3 = pricerate_3 * ticket_rate.ticketRate;
              }
              let wallet_find = await Wallet.findOne({
                userId: parseInt(ticket_data[i].userId),
              });

              let addon_wallet = await Wallet.findOneAndUpdate(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  amount: wallet_find.amount + pricerate3,
                }
              );

              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.2.status": "true",
                }
              );
            } else {
              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.2.status": "false",
                }
              );
            }
          }
        } else if (j === 3) {
          if (thirddigit != undefined) {
            if (
              ticket_data[i].ticket[j].digit === parseInt(req.body[j].digit)
            ) {
              if (price_rate != null) {
                pricerate_4 = price_rate.priceRate_splitup[0].fourth_digit;
                pricerate4 = pricerate_4 * ticket_rate.ticketRate;
              }
              let wallet_find = await Wallet.findOne({
                userId: parseInt(ticket_data[i].userId),
              });

              let addon_wallet = await Wallet.findOneAndUpdate(
                {
                  userId: parseInt(ticket_data[i].userId),
                },
                {
                  amount: wallet_find.amount + pricerate4,
                }
              );

              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
                },
                {
                  "ticket.3.status": "true",
                }
              );
            } else {
              let ticket_update = await Ticket.findOneAndUpdate(
                {
                  ticketId: ticket_data[i].ticketId,
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

    return res
      .status(200)
      .json({ response: "Published result successfully", Winners: t });
  } catch (err) {
    console.log(err);
  }
};

const getHistories = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error", err);
  }
};

const addTicketRate = async (req, res) => {
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

const updateUserId = async (req, res) => {
  let start_date = new Date(req.query.date);
  let end_date = new Date(start_date.setDate(start_date.getDate() + 1));
  let add_count = await TicketRate.updateOne(
    {
      CreatedAt: { $gt: start_date, $lt: end_date },
    },
    {
      userId: parseInt(req.body.userId),
    }
  );

  return res.status(200).json({ response: "Added successfully" });
};

const addWalletAmount = async (req, res) => {
  try {
    let date = new Date();
    let start_date = new Date(date.setHours(date.getHours() + 5));
    new Date(date.setMinutes(date.getMinutes() + 30));
    let wallet_find = await Wallet.findOne({
      userId: req.body.userId,
    });
    let wallet;

    if (wallet_find != null) {
      wallet = await Wallet.updateOne(
        {
          userId: req.body.userId,
        },
        {
          amount: parseInt(req.body.amount),
        }
      );
    } else {
      wallet = await Wallet.create({
        amount: parseInt(req.body.amount),
        userId: parseInt(req.body.userId),
        username: req.body.username,
        CreatedAt: date,
      });
      let wallet_history = await WalletHistory.create({
        amount: req.body.amount,
        userId: parseInt(req.body.userId),
        username: req.body.username,
        status: true,
        CreatedAt: date,
      });
    }
    return res.status(200).json({ response: "Data inserted successfully" });
  } catch (err) {
    console.error("Error", err);
  }
};

const addWallettAmount = async (req, res) => {
  let date = new Date();
  let start_date = new Date(date.setHours(date.getHours() + 5));
  new Date(date.setMinutes(date.getMinutes() + 30));
  let wallet_find = await Wallet.findOne({
    userId: req.body.userId,
  });
  let add_amount;

  if (wallet_find != null) {
    add_amount = await Wallet.updateOne(
      {
        userId: req.body.userId,
      },
      {
        amount: wallet_find.amount + parseInt(req.body.amount),
      }
    );
    let wallet_history = await WalletHistory.create({
      amount: parseInt(req.body.amount),
      userId: parseInt(req.body.userId),
      username: req.body.username,
      status: true,
      CreatedAt: date,
    });

    await getWall(parseInt(req.body.userId));
  } else {
    add_amount = await Wallet.create({
      amount: parseInt(req.body.amount),
      userId: parseInt(req.body.userId),
      username: req.body.username,
      CreatedAt: date,
    });

    let wallet_history = await WalletHistory.create({
      amount: parseInt(req.body.amount),
      userId: parseInt(req.body.userId),
      username: req.body.username,
      status: true,
      CreatedAt: date,
    });
    await DailyTicketCount.create({
      userId: parseInt(req.body.userId),
      CreatedAt: date,
    });
    await MonthlyTicketCount.create({
      userId: parseInt(req.body.userId),
      CreatedAt: date,
    });
    await WeeklyTicketCount.create({
      userId: parseInt(req.body.userId),
      CreatedAt: date,
    });
  }
  return res.status(200).json({ response: "Data inserted successfully" });
};

const addTicketCount = async (req, res) => {
  try {
    let start_date = new Date(req.query.date);
    const ticketId = await getNextSequenceValue("ticketId");
    console.log(req.body, "request");
    for (let i = 0; i < parseInt(req.body.ticketCount); i++) {
      let find_wallet = await DailyTicketCount.findOne({
        userId: req.query.userId,
      });

      if (find_wallet.alreadyDailyTicketCount <= 15) {
        let add_count = await DailyTicketCount.updateOne(
          {
            userId: req.query.userId,
          },
          {
            dailyTicketCount:
              find_wallet.dailyTicketCount + parseInt(req.body.ticketCount),
            alreadyDailyTicketCount:
              find_wallet.alreadyDailyTicketCount +
              parseInt(req.body.ticketCount),
          }
        );
        return res
          .status(200)
          .json({ response: "added ticket count successfully" });
      }
    }
  } catch (err) {
    console.log("Only 15 tickets can be bought");
    return res.status(500).json({ response: "Only 15 tickets can be bought" });
    console.error("Error", err);
  }
};

const getDailyTicketCount = async (req, res) => {
  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  try {
    let get_ticket_rate = await DailyTicketCount.findOne({});
    return res
      .status(200)
      .json({ response: "Got Data successfully", data: get_ticket_rate });
  } catch (err) {
    console.error("Error", err);
  }
};

const getTicketRate = async (req, res) => {
  let start_date = new Date(req.query.date);
  let date = new Date(req.query.date);

  try {
    let get_ticket_rate = await TicketRate.findOne({});
    return res
      .status(200)
      .json({ response: "Got Data successfully", data: get_ticket_rate });
  } catch (err) {
    console.error("Error", err);
  }
};

const getWalletHistory = async (req, res) => {
  let pageno = req.query.pageno;
  let skip_page = pageno * 10;
  let arr = [];
  let a = 0;
  let all_data = {};
  try {
    let get_wallet = await WalletHistory.find({
      userId: parseInt(req.query.userId),
    })
      .skip(skip_page)
      .limit(10);
    for (let i = 0; i < get_wallet.length; i++) {
      a += 1;
      all_data = {
        number: a,
        CreatedAt: moment(get_wallet[i].CreatedAt).format("YYYY-MM-DD"),
        amount: get_wallet[i].amount,
        status: get_wallet[i].status,
      };
      arr.push(all_data);
    }
    let get_count = await WalletHistory.find({
      userId: req.query.userId,
    }).countDocuments();
    return res.status(200).json({
      response: "Got data successfully",
      data: arr,
      count: get_count,
    });
  } catch (err) {
    console.error("Error in getting wallet history Please check function", err);
  }
};

const getBuyedTicketCount = async (req, res) => {
  try {
    let get_ticket_count;
    if (req.query) {
      get_ticket_count = await DailyTicketCount.findOne({
        userId: req.query.userId,
      });
    } else {
      get_ticket_count = await DailyTicketCount.findOne({
        userId: userId,
      });
    }

    return res.status(200).json({ data: get_ticket_count });
  } catch (err) {
    console.log(err);
  }
};

const getWalletAmount = async (req, res) => {
  try {
    let get_wallet = await Wallet.findOne({
      userId: req.query.userId,
    });

    res.status(200).json({ data: get_wallet });
  } catch (err) {
    console.log(err);
  }
};

const getWall = async (userId) => {
  try {
    let get_wallet = await Wallet.findOne({
      userId: userId,
    });

    return get_wallet;
  } catch (err) {
    console.log(err);
  }
};

const getWinner = async (req, res) => {
  try {
    let all_data = {};
    let user_find;
    let arr = [];
    let get_wallet = await Ticket.find({});
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

const addPriceRate = async (req, res) => {
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

const getPriceRate = async (req, res) => {
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

const getResult = async (req, res) => {
  try {
    let data_get = await Result.findOne({});

    res.status(200).json({ response: "Got data successfully", data: data_get });
  } catch (error) {
    console.error(error);
  }
};

const getHistorry = async (req, res) => {
  try {
    let get_all = [];
    let pageno = req.query.pageno;
    let skip_page = pageno * 10;
    let get_Histories = await DailyHistory.find({}).skip(skip_page).limit(10);
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
    let data_count = await DailyHistory.find().countDocuments();
    res.status(200).json({
      response: "Got data successfully",
      data: get_all,
      count: data_count,
    });
  } catch (error) {
    console.error(error);
  }
};

const callSecondApi = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(`data: ${JSON.stringify({ message: "Connected" })}\n\n`);
  req.on("close", () => {});
};

const callSecondApi1 = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write(`data: ${JSON.stringify({ message: "Connected" })}\n\n`);
  req.on("close", () => {});
};

const callSecondApi2 = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write(`data: ${JSON.stringify({ message: "Connected" })}\n\n`);
  req.on("close", () => {});
};

cron.schedule("0 17 * * *", async () => {
  console.log("cron running at 5 pm everyday");
  await TicketRate.deleteMany({});
  await PriceRate.deleteMany({});
});

cron.schedule("0 18 * * *", async () => {
  console.log("cron running at 6 pm everyday");
  await Ticket.deleteMany({});
  await TicketRate.deleteMany({});
  await PriceRate.deleteMany({});
  await DailyTicketCount.updateMany({
    alreadyDailyTicketCount: 0,
    dailyTicketCount: 0,
  });
});

cron.schedule("0 19 * * *", async () => {
  console.log("cron running at 7 pm everyday");
  let reault_delete = await Result.deleteMany({});
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
  addTicketDaily,
  getMinimum,
  getTickets,
  publish_result,
  getHistories,
  addTicketRate,
  getTicketRate,
  addTicketCount,
  addWalletAmount,
  getWalletHistory,
  getBuyedTicketCount,
  addWallettAmount,
  getWinner,
  updatePriceRate: addPriceRate,
  getResult,
  getHistorry,
  getPriceRate,
  callSecondApi,
  callSecondApi1,
  callSecondApi2,
  getDailyTicketCount,
  getWalletAmount,
};
