const express = require("express");
const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");
const liveClassRoutes = require("./liveClass.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/live-classes", liveClassRoutes);

module.exports = router;
