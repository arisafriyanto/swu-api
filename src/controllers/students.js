const StudentModel = require("./../models/students");

const getStudentByPhone = async (req, res) => {
  const phone = req.student.NO_HP;
  try {
    const [row] = await StudentModel.getStudentByPhone(phone);
    return res.status(200).json({
      message: "Get student success",
      data: row,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = { getStudentByPhone };
