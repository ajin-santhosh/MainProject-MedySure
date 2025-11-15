const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
const doctorController = require("../controller/doctorController")

router.post('/createDoctor',userController.createDoctor)
router.put('/updateDoctor/:userId',userController.updateDoctor)
router.delete('/deleteDoctor/:userId',userController.deleteDoctor)
router.get('/getdoctor',doctorController.getDoctors)
module.exports = router