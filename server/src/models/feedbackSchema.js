const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    index:true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    index:true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    index:true
    },
  description: {
    type: String
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: null,
    index:true
  },

},
{ timestamps: true }
);
module.exports = mongoose.model("Feedback",feedbackSchema)

