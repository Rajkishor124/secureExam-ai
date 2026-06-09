const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);