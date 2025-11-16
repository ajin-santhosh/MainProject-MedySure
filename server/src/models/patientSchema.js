const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"]
    },
    age: {
      type: Number,
      required: true
    },
    blood_group: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    weight: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true, trim: true }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
