const { decryptDataAES256Cbc } = require("../utils/crypsi");
const dbPool = require("./../config/database");

function cleanPhoneNumber(phone) {
  return phone.replace(/^0/, "62").replace(/\D/g, "");
}

const checkPhoneNumber = async (req, res, next) => {
  try {
    const { phone } = req.headers;

    if(!phone) {
      throw new Error(
        "Phone is required!"
      );
    }

    const decryptPhone = decryptDataAES256Cbc(phone);
    const cleanedPhone = cleanPhoneNumber(decryptPhone);
    // console.log(cleanedPhone);

    const SQLQuery = `
      SELECT nama, NIM, NO_HP 
      FROM tb_mahasiswa 
      WHERE 
        IF(SUBSTR(NO_HP, 1, 1) = '0', CONCAT('62', SUBSTR(NO_HP, 2)), REPLACE(REPLACE(REPLACE(NO_HP, '+', ''), ' ', ''), '-', '')) = ?
    `;

    const [result] = await dbPool.execute(SQLQuery, [cleanedPhone]);

    if (result.length < 1) {
      throw new Error(
        "Maaf, nomor Anda tidak terdaftar dalam sistem kami. Silahkan perbarui nomor WhatsApp Anda pada aplikasi MySwu dengan format 628xxx."
      );
    }

    req.student = result[0];
    next();
  } catch (error) {
    console.log(error);

    let statusCode = 500;
    if (error.message.includes("terdaftar")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.message,
    });
  }
};

module.exports = checkPhoneNumber;
