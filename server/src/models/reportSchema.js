const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    fileUrl: [
      {
        type: String,
        required:true,
        index:true
      }  
    ],
    public_id:[
      {
        type:String,
        required:true,
        index:true
      }
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Report", reportSchema);
