const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    facultyName: {
      type: String,
      required: true
    },
    startsAt: {
      type: Date,
      required: true
    },
    durationMinutes: {
      type: Number,
      default: 60
    },
    provider: {
      type: String,
      enum: ["zoom", "google-meet", "youtube-live", "custom"],
      default: "zoom"
    },
    joinUrl: {
      type: String,
      default: ""
    },
    recordingUrl: {
      type: String,
      default: ""
    },
    notesUrl: {
      type: String,
      default: ""
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);
