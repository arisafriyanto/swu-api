const express = require("express");
const StudentController = require("./../controllers/students");

const router = express.Router();

router.get("/", StudentController.getStudentByPhone);

module.exports = router;
