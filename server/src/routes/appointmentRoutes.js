const express = require('express');
const router = express.Router();
const appointmentController = require("../controller/appointmentController")

router.post('/createAppointment',appointmentController.createAppointment)
router.put('/updateAppointment/:appointmentId',appointmentController.updateAppointment)
router.delete('/deleteAppointment/:appointmentId',appointmentController.deleteAppointment)
router.get('/getAppointment',appointmentController.getAppointment)
router.get('/getAppointmentForCalanadar',appointmentController.getAppointmentForCalanadar)
router.get('/getAppointmentForPatient/:userId',appointmentController.getAppointmentForPatient)
router.get('/getAppointmentForPatientHealthBoard/:userId',appointmentController.getAppointmentForPatientHelathBoard)
router.get('/getAppointmentForDoctor/:userId',appointmentController.getAppointmentForDoctor)
router.patch('/doctorAddNotes/:appointmentId',appointmentController.doctorAddNotes)
router.patch('/doctorUpdateAppointment/:appointmentId',appointmentController.doctorUpdateAppointment)


module.exports = router