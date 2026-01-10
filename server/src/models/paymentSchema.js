const mongoose = require("mongoose")
 const paymentSchema = new mongoose.Schema({

     patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
      paymentIntentId: {
         type: String,
        required: true
      },
      sessionId: {
        type: String,
        required: true
      },
      appointmentId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
     
      type :{
        type: String,
        required: true
      },
      amount: {
      type: Number,
      required: true,
      min: 0
    },
 },
  { timestamps: true }
)
module.exports = mongoose.model("Payment",paymentSchema)