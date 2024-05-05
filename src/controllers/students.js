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
    console.log(error);
    const { statusCode, errorMessage } = helper.generateErrorMessage(error);

    return res.status(statusCode).json({
      status: "fail",
      message: errorMessage,
      data: [],
    });
  }
};

module.exports = { getStudentByPhone };
