const express = require('express');
const router = express.Router();
const reportController = require("../controller/reportController")

router.post('/createReport',reportController.createReport)
router.post('/createPrescription',reportController.createPrescription)

router.get('/getReport',reportController.getReport)
router.get('/dowReport/:reportId',reportController.downloadReport)
router.get('/getReportForPatient/:userId',reportController.getReportForPatient)
router.get('/getReportForDoctor/:userId',reportController.getReportForDoctor)




module.exports = router