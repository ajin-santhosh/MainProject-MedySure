const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
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
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
