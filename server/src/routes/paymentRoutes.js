const express = require('express');
const router = express.Router();
const paymentController = require("../controller/paymentController")

router.post("/create-checkout-session", paymentController.createCheckoutSession);
router.post("/verifyAndSavePayment", paymentController.verifyAndSavePayment);

module.exports = router