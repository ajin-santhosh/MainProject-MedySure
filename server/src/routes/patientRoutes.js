const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
const patientController = require("../controller/patientController")
router.post('/createPatient',userController.createPatient)
router.post('/patientOtpValidate/:userId',patientController.patientOtpValidator)
router.post('/patienDetailsRegister',patientController.registerPatientDetails)
router.put('/updatePatient/:userId',userController.updatePatient)
router.delete('/deletePatient/:userId',userController.deletePatient)
router.get('/getPatients',patientController.getPatient)
module.exports = router