const CourseModel = require("./../models/courses");
const helper = require("./../utils/helper");

const getCourseGrades = async (req, res) => {
  try {
    const { NIM } = req.student;
    const { type } = req.query;

    const validTypes = ["all"];
    if (!validTypes.includes(type)) {
      throw new Error("Invalid parameter");
    }

    let result = [];

    if (type === "all") {
      const [rows] = await CourseModel.getCourseGrades(NIM);
      result.push(...rows);
    }

    if (result.length < 1) {
      throw new Error("Maaf, tidak ada data mata kuliah yang tersedia saat ini 😌");
    }

    result.map((item, index) => {
      // item.nama = capitalizeWords(item.nama);
      item.nm_mk = helper.capitalizeWords(item.nm_mk);
      item.index = index + 1;
    });

    const response = res.status(200).json({
      status: "success",
      message: "Get course grades success.",
      data: result,
    });

    return response;
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

const convertGradeToNumeric = (grade) => {
  switch (grade.toUpperCase()) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    default:
      return 0;
  }
};

const getCourseIPK = async (req, res) => {
  try {
    const { NIM } = req.student;

    const [rows] = await CourseModel.getCourseIPK(NIM);

    if (rows.length < 1) {
      throw new Error(`Maaf, tidak ada data IPK yang tersedia saat ini 😔`);
    }

    let totalBobotKredit = 0;
    let totalSKS = 0;

    [...rows].forEach((item) => {
      const nilai = convertGradeToNumeric(item.NILAI);
      const sks = parseFloat(item.sks);

      const bobotKredit = nilai * sks;

      totalBobotKredit += bobotKredit;
      totalSKS += sks;
      // console.log(`Nilai: ${nilai} x ${sks} = ${bobotKredit}`);
    });
    // console.log(totalBobotKredit);
    // console.log(totalSKS);

    const ipk = totalBobotKredit / totalSKS;
    const formatIpk = ipk.toFixed(2);
    // console.log(ipk);

    const response = res.status(200).json({
      status: "success",
      message: "Get IPK success.",
      data: {
        IPK: formatIpk,
        SKS: totalSKS,
      },
    });

    return response;
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

module.exports = { getCourseGrades, getCourseIPK };
