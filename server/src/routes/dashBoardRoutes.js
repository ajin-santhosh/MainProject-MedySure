const express = require('express');
const router = express.Router();
const dashBoardController = require("../controller/dashBoardController")


router.get('/totalDoctors',dashBoardController.totalDoctors)
router.get('/totalPatients',dashBoardController.totalPatients)
router.get('/totalappointments',dashBoardController.totalAppointment)
router.get('/totalfeedback',dashBoardController.totalFeedback)
router.get('/totalreports',dashBoardController.totalReport)
router.get('/totalPayment',dashBoardController.totalPayment)
router.get('/appintmentStatusReport',dashBoardController.appintmentStatusReport)
router.get('/appointmentWeekReport',dashBoardController.appointmentWeekReport)
router.get('/paymentWeekReport',dashBoardController.paymentWeekReport)
router.get('/patientWeekReport',dashBoardController.patientWeekReport)
router.get('/acivePatientCount',dashBoardController.acivePatientCount)
router.get('/totalAppointmentByPatient/:id',dashBoardController.totalAppointmentByPatient)
router.get('/totalFeedbackByPatient/:id',dashBoardController.totalFeedbackByPatient)
router.get('/totalReportsByPatient/:id',dashBoardController.totalReportsByPatient)
router.get('/totalPaymentsByPatient/:id',dashBoardController.totalPaymentsByPatient)
router.get('/patientAppintmentStatusReport/:userId',dashBoardController.patientAppintmentStatusReport)
router.get('/totalAppointmentForDoctor/:userId',dashBoardController.totalAppointmentForDoctor)
router.get('/totalFeedbackForDoctor/:userId',dashBoardController.totalFeedbackForDoctor)
router.get('/totalReportsByDoctor/:userId',dashBoardController.totalReportsByDoctor)
router.get('/doctorAppintmentStatusReport/:userId',dashBoardController.doctorAppintmentStatusReport)
router.get('/appointmentWeekReportDoctor/:userId',dashBoardController.appointmentWeekReportDoctor)





module.exports = router