const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
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
    reportId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      }
    ],

    appointmentDate: {
      type: Date,
      required: true,
      validate: {
        validator: (v) => v > Date.now(),
        message: "Appointment date must be in the future.",
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "rescheduled", "cancelled", "completed"],
      default: "pending",
      required: true,
    },
    notes: {
      type: String,
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", appointmentSchema);
