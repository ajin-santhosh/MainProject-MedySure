const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController')

router.post('/userLogin',loginController.userLogin)
router.post('/userLogout',loginController.userLogout)
module.exports =router