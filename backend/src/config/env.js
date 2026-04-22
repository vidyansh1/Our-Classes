const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ownclasses",
  jwtSecret: process.env.JWT_SECRET || "replace-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  zoomJoinBaseUrl: process.env.ZOOM_JOIN_BASE_URL || "",
  googleMeetBaseUrl: process.env.GOOGLE_MEET_BASE_URL || ""
};
