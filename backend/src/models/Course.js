const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["video", "note", "assignment", "recording"],
      default: "video"
    },
    resourceUrl: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    summary: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: "UPSC"
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    mentorName: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    },
    lessons: {
      type: [lessonSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
