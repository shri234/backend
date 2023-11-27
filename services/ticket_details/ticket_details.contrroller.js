const express = require('express');
const tickets = require('./ticket_details.service');
const router = express.Router(); 
router.post('/addTicket',tickets.addTicketDaily);
router.get('/getMinimum',tickets.get_Minimum);
router.get('/getTickets', tickets.getTickets); 
router.post('/publishResult',tickets.publish_result);
router.get('/getHistory',tickets.getHistories);
router.get('/getTicketRate',tickets.getTicketRate);
router.post('/addTicketRate',tickets.addTicketRate);
router.post('/addTicketCount',tickets.addTicketCount);
router.post("/addWalletAmount",tickets.addWalletAmount);
router.get('/getWalletHistory',tickets.getWalletHistory);
router.get('/getWallet',tickets.getWallet);
router.post("/addWallet",tickets.addWallettAmount);
router.get("/getWinner",tickets.getWinner);
router.put("/updatePriceRate",tickets.updatePriceRate);
router.put("/getPriceRate",tickets.getPriceRate);
router.get("/result",tickets.getResult);
router.get("/getAllHistory",tickets.getHistorry);
module.exports = router

