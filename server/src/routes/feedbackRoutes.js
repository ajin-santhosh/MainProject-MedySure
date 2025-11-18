const express = require('express');
const router = express.Router();
const feedbackController = require("../controller/feedbackController")

router.post('/createFeedback',feedbackController.createFeedback)
router.get('/getFeedback',feedbackController.getFeedback)
router.delete('/deleteFeedback/:feedbackId',feedbackController.deleteFeedback)

module.exports = router