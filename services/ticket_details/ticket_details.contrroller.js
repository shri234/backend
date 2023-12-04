const express = require("express");
const tickets = require("./ticket_details.service");
const weekly_ticket = require("./weekly_ticket.service");
const monthly_ticket = require("./monthly_ticket.service");

const router = express.Router();

// weekly api's
router.post("/add-weekly-ticket", weekly_ticket.addTicketWeekly);
router.get("/get-weekly-tickets", weekly_ticket.getWeeklyTickets);
router.get("/get-weekly-ticket-rate", weekly_ticket.getWeeklyTicketRate);
router.get("/get-weekly-minimum", weekly_ticket.getMinimumWeeklyTicket);
router.get("/weekly-publish-result", weekly_ticket.weeklyPublishTicketResult);
router.get("/add-weekly-ticket-rate", weekly_ticket.addWeeklyTicketRate);
router.get("/add-weekly-ticket-count", weekly_ticket.addWeeklyTicketCount);
router.get("/get-weekly-price-rate", weekly_ticket.getWeeklyPriceRate);
router.get("/add-weekly-price-rate", weekly_ticket.addWeeklyPriceRate);
router.get("/get-weekly-winner", weekly_ticket.getWeeklyWinner);
router.get("/get-weekly-result", weekly_ticket.getWeeklyResult);
router.get("/get-weekly-ticket-count", weekly_ticket.getWeeklyBuyedTicketCount);

// monthly api's
router.post("/add-monthly-ticket", monthly_ticket.addTicketMonthly);
router.get("/get-monthly-tickets", monthly_ticket.getMonthlyTickets);
router.get("/get-monthly-ticket-rate", monthly_ticket.getMonthlyTicketRate);
router.get("/get-monthly-minimum", monthly_ticket.getMinimumMonthlyTicket);
router.get(
  "/monthly-publish-result",
  monthly_ticket.monthlyPublishTicketResult
);
router.get("/add-monthly-ticket-rate", monthly_ticket.addMonthlyTicketRate);
router.get("/add-monthly-ticket-count", monthly_ticket.addMonthlyTicketCount);
router.get("/get-monthly-price-rate", monthly_ticket.getMonthlyPriceRate);
router.get("/add-monthly-price-rate", monthly_ticket.addMonthlyPriceRate);
router.get("/get-monthly-winner", monthly_ticket.getMonthlyWinner);
router.get(
  "/get-monthly-ticket-count",
  monthly_ticket.getMonthlyBuyedTicketCount
);
router.get("/get-monthly-result", monthly_ticket.getMonthlyResult);

// dayily api's
router.post("/addTicket", tickets.addTicketDaily);
router.get("/get-daily-minimum", tickets.getMinimum);
router.get("/get-daily-tickets", tickets.getTickets);
router.post("/publishResult", tickets.publish_result);
router.get("/getHistory", tickets.getHistories);
router.get("/get-daily-ticket-rate", tickets.getTicketRate);
router.post("/addTicketRate", tickets.addTicketRate);
router.post("/addTicketCount", tickets.addTicketCount);
router.post("/addWalletAmount", tickets.addWalletAmount);
router.get("/getWalletHistory", tickets.getWalletHistory);
router.get("/get-daily-ticket-count", tickets.getBuyedTicketCount);
router.post("/addWallet", tickets.addWallettAmount);
router.get("/get-daily-winner", tickets.getWinner);
router.put("/add-daily-price-rate", tickets.updatePriceRate);
router.get("/get-daily-price-rate", tickets.getPriceRate);
router.get("/get-daily-result", tickets.getResult);
router.get("/getAllHistory", tickets.getHistorry);

// sse
router.get("/sse", tickets.callSecondApi);
router.get("/sse1", tickets.callSecondApi1);
router.get("/sse2", tickets.callSecondApi2);
module.exports = router;
