const dbPool = require("./../config/database");

const getCourseGrades = (NIM) => {
  const SQLQuery = `
  SELECT nilai.NIM, 
         nilai.KD_MK, 
         nilai.NILAI, 
         mk.nm_mk,
         mk.sks
  FROM tb_nilai nilai
  JOIN tb_mk mk ON nilai.KD_MK = mk.kd_mk
  WHERE nilai.NIM = ?
  AND nilai.NILAI != ''
  ORDER BY mk.nm_mk ASC`;
  return dbPool.execute(SQLQuery, [NIM]);
};

const getCourseIPK = (NIM) => {
  const SQLQuery = `
  SELECT nilai.NIM, 
         nilai.KD_MK, 
         nilai.NILAI, 
         mk.nm_mk,
         mk.sks
  FROM tb_nilai nilai
  JOIN tb_mk mk ON nilai.KD_MK = mk.kd_mk
  WHERE nilai.NIM = ?
  AND nilai.NILAI != ''`;
  return dbPool.execute(SQLQuery, [NIM]);
};

module.exports = { getCourseGrades, getCourseIPK };