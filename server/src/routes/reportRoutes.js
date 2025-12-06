const express = require('express');
const router = express.Router();
const reportController = require("../controller/reportController")

router.post('/createReport',reportController.createReport)
router.get('/getReport',reportController.getReport)
router.get('/dowReport/:reportId',reportController.downloadReport)




module.exports = router