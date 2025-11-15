const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController")

router.post('/createAdmin', adminController.createAdmin)  
router.put('/updateAdmin/:userId',adminController.updateAdmin)
router.get('/getAdmins',adminController.getAdmins)
router.delete('/deleteAdmin/:userId',adminController.deleteAdmin)
module.exports = router