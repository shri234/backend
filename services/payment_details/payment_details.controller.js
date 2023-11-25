const express = require('express');
const payment_details = require('./payment_details.service');
const router = express.Router(); 
router.post('/addpaymentDetails',payment_details.addPaymentDetails);
router.post('/paymentIntegration',payment_details.paymentIntegration);
router.get('/getPaymentDetails', payment_details.get_paymentdetails); 
router.post('/paymentverify',payment_details.paymentVerification);
router.post('/redeem',payment_details.redeemHistory);
router.get('/getRedeem', payment_details.getRedeemHistory); 
router.put('/getRedeem', payment_details.updateRedeemHistory); 
router.delete('/getRedeem', payment_details.deleteRedeemHistory); 
module.exports = router
