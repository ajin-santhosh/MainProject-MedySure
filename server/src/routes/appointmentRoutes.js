const express = require('express');
const router = express.Router();
const appointmentController = require("../controller/appointmentController")

router.post('/createAppointment',appointmentController.createAppointment)
router.put('/updateAppointment/:appointmentId',appointmentController.updateAppointment)
router.delete('/deleteAppointment/:appointmentId',appointmentController.deleteAppointment)
router.get('/getAppointment',appointmentController.getAppointment)
router.get('/getAppointmentForCalanadar',appointmentController.getAppointmentForCalanadar)
router.get('/getAppointmentForPatient/:userId',appointmentController.getAppointmentForPatient)
module.exports = router