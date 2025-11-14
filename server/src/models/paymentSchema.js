const mongoose = require("mongoose")
 const paymentSchema = new mongoose.Schema({

     patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
      appointmentId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
      },
      status :{
        type: String,
        enum: ["pending","completed","failed"],
        required: true,
        default:"pending"
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
    ransactionId: {
      type: String,
      unique: true,
      sparse: true // allows null but unique when present
    }
 },
  { timestamps: true }
)
module.exports = mongoose.model("Payment",paymentSchema)