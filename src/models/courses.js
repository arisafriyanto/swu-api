const dbPool = require("./../config/database");

const getCourseGrades = (NIM) => {
  const SQLQuery = `
  SELECT krs.NIM, 
         krs.KD_MK, 
         krs.ID_JADWAL, 
         krs.NILAI_FINAL, 
         mk.nm_mk,
         mk.sks
  FROM tb_krs krs
  JOIN tb_mk mk ON krs.KD_MK = mk.kd_mk
  WHERE krs.NIM = ?
  AND krs.NILAI_FINAL != ''
  ORDER BY mk.nm_mk ASC`;
  return dbPool.execute(SQLQuery, [NIM]);
};

const getCourseIPK = (NIM) => {
  const SQLQuery = `
  SELECT krs.NIM, 
         krs.KD_MK, 
         krs.ID_JADWAL, 
         krs.NILAI_FINAL, 
         mk.nm_mk,
         mk.sks
  FROM tb_krs krs
  JOIN tb_mk mk ON krs.KD_MK = mk.kd_mk
  WHERE krs.NIM = ?
  AND krs.NILAI_FINAL != ''`;
  return dbPool.execute(SQLQuery, [NIM]);
};

module.exports = { getCourseGrades, getCourseIPK };
