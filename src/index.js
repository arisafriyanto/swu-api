const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const checkPhoneNumber = require("./middleware/checkPhoneNumber");
const { studentRoutes, courseRoutes, scheduleRoutes } = require("./routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname));

app.use(checkPhoneNumber);

app.use("/students", studentRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/courses", courseRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
