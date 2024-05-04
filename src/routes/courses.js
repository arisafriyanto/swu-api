const express = require("express");
const CourseController = require("./../controllers/courses");

const router = express.Router();

router.get("/grades", CourseController.getCourseGrades);
router.get("/ipk", CourseController.getCourseIPK);

module.exports = router;
