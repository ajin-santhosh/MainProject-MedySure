const express = require('express');
const router = express.Router();
const reportController = require("../controller/reportController")

router.get('/createReport',reportController.createReport)

module.exports = router