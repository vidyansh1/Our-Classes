const express = require("express");
const { listLiveClasses, createLiveClass } = require("../controllers/liveClass.controller");

const router = express.Router();

router.get("/", listLiveClasses);
router.post("/", createLiveClass);

module.exports = router;
