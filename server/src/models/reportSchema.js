const mongoose = require("mongoose");
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true
        },
        doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true
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
        type: String
      },
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Report", reportSchema);
