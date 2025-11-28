const express = require('express');
const router = express.Router();
const dashBoardController = require("../controller/dashBoardController")


router.get('/totalDoctors',dashBoardController.totalDoctors)
router.get('/totalPatients',dashBoardController.totalPatients)
router.get('/totalappointments',dashBoardController.totalAppointment)
router.get('/totalfeedback',dashBoardController.totalFeedback)
router.get('/totalreports',dashBoardController.totalReport)
router.get('/appintmentStatusReport',dashBoardController.appintmentStatusReport)
router.get('/appointmentWeekReport',dashBoardController.appointmentWeekReport)

module.exports = router