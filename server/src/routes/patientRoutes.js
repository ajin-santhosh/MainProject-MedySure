const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
const patientController = require("../controller/patientController")
router.post('/createPatient',userController.createPatient)
router.post('/patientOtpValidate/:userId',patientController.patientOtpValidator)
module.exports = router