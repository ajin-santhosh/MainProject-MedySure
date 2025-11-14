const express = require('express');
const router = express.Router();
const {createAdmin,updateAdmin,getAdmins,deleteAdmin} = require("../controller/adminController")

router.post('/createAdmin', createAdmin)  
router.put('/updateAdmin/:userId',updateAdmin)
router.get('/getAdmins',getAdmins)
router.delete('/deleteAdmin/:userId',deleteAdmin)
module.exports = router