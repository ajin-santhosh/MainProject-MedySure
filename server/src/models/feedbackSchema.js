const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    default:null
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: null,
  },

},
{ timestamps: true }
);
module.exports = mongoose.model("Feedback",feedbackSchema)

