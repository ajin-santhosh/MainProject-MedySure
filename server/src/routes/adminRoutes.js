const express = require('express');
const router = express.Router();
const {createAdmin,updateAdmin} = require("../controller/adminController")

router.post('/createAdmin', createAdmin)  
router.put('/updateAdmin/:userId',updateAdmin)
module.exports = router