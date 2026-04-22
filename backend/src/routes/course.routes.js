const express = require("express");
const { listCourses, createCourse } = require("../controllers/course.controller");

const router = express.Router();

router.get("/", listCourses);
router.post("/", createCourse);

module.exports = router;
