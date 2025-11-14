const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "admin"],
      index: true   
    },
    active: {
      type: Boolean,
      default: true,
      index: true   
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Users',userSchema)
