const express = require("express");
const SchedulesController = require("./../controllers/schedules");

const router = express.Router();

router.get("/", SchedulesController.getSchedules);

module.exports = router;
