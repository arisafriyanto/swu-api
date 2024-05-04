const dbPool = require("./../config/database");

const getStudentByPhone = (phone) => {
  const SQLQuery = `
  SELECT nama,
         NIM, 
         NO_HP 
  FROM tb_mahasiswa 
  WHERE NO_HP=?`;
  return dbPool.execute(SQLQuery, [phone]);
};

module.exports = { getStudentByPhone };
