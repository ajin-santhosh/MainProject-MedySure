const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index:true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index:true

    },
    reportId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        default:null,
        index:true

      }
    ],
        paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      index:true

    },
    appointmentDate: {
      type: Date,
      required: true,
      validate: {
        validator: (v) => v > Date.now(),
        message: "Appointment date must be in the future."
      },
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "rescheduled", "cancelled", "completed"],
      default: "pending",
      required: true,
      index:true

    },
    notes: {
      type: String
    },
    payment: {
      type: Boolean,
      default: false,
      index:true

    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);
