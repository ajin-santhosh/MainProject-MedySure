const express = require('express');
const router = express.Router();
const healthTableController = require("../controller/healthTableController")

router.post('/createHealthTable/:doctorId', healthTableController.createHealthTable)  
router.get('/getHealthTable',healthTableController.getHelathTable)
router.get('/getHealthTablePatient/:userId',healthTableController.getHelathTablePatient)
router.put('/updateHealthTable/:healthtable', healthTableController.updateHealthTable)  


module.exports = router