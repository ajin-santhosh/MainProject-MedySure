const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true   

    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"]
    },
    experiance: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true,
        index: true   


    },
    qualification:{
         type: String,
        required: true
    }
},  { timestamps: true }

)
module.exports = mongoose.model("Doctor", doctorSchema)