const Feedback = require('../models/feedbackSchema')

const createFeedback = async (req,res) => {

    const {patientId,doctorId,appointmentId,description,rating} = req.body 
    try{
        if(!patientId){
           res.status(409)
        .json({ success: false, message: "patient id is missing" })
        }

      const newFeedback = await Feedback.create({patientId,doctorId,appointmentId,description,rating})
      return res.status(201).json({
      success: true,
      message: "feedback created successfully",
      data: newFeedback,
    })

    }
    catch(error)
    {
        console.error("Error  creating feedback:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" })
    }
}
const getFeedback = async (req,res) => {
    try{
        const feedbacks = await Feedback.find()
         return res.status(201).json({
      success: true,
      message: "feedback ",
      data: feedbacks,
    });
    }
    catch(error){
         console.error("Error in getting feedbacks:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
    }
}
const deleteFeedback = async (req,res)  =>{
    const {feedbackId} = req.params
    try{
        if(!feedbackId){
             res.status(409)
        .json({ success: false, message: "feedback id is missing" })
        }
        const deletedfeedback = await Feedback.findByIdAndDelete(feedbackId)
        return res.status(201).json({
      success: true,
      message: "feedback deleted successfully",
      data: deletedfeedback
    });
    }
    catch(error){
         console.error("Error in deleting feedbacks:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });

    }

}
module.exports = {createFeedback,getFeedback,deleteFeedback}