const dbPool = require("./../config/database");

const getSchedulesToday = (NIM, thn_akdm, startDate) => {
  const SQLQuery = `
  SELECT krs.NIM,
    krs.KD_MK,
    krs.ID_JADWAL,
    DATE_FORMAT(jd_rnc.tgl, '%Y-%m-%d') AS tgl_awal,
    DATE_FORMAT(jd_rnc.tglsd, '%Y-%m-%d') AS tgl_sd,
    jd_rnc.jam_awal,
    jd_rnc.jam_akhir,
    jd_rnc.ruang,
    jd_rnc.nama,
    jd_rnc.nm_mk,
    jd_rnc.ket_perkuliahan,
    jd_rnc.ket
  FROM tb_krs krs
  JOIN tb_jadwal jd ON krs.ID_JADWAL = jd.ID_JADWAL
  JOIN tb_jadwal_rinci jd_rnc ON jd.ID_JADWAL = jd_rnc.id_jadwal
  WHERE krs.NIM = ?
  AND jd.th_akdm = '${thn_akdm}'
  AND jd_rnc.th_akdm = '${thn_akdm}'
  AND jd_rnc.tgl = ?
  ORDER BY jd_rnc.jam_awal ASC`;
  return dbPool.execute(SQLQuery, [NIM, startDate]);
};

const getSchedulesWeekly = (NIM, thn_akdm, startDate, endDate) => {
  const SQLQuery = `
  SELECT krs.NIM,
    krs.KD_MK,
    krs.ID_JADWAL,
    DATE_FORMAT(jd_rnc.tgl, '%Y-%m-%d') AS tgl_awal,
    DATE_FORMAT(jd_rnc.tglsd, '%Y-%m-%d') AS tgl_sd,
    jd_rnc.jam_awal,
    jd_rnc.jam_akhir,
    jd_rnc.ruang,
    jd_rnc.nama,
    jd_rnc.nm_mk,
    jd_rnc.ket_perkuliahan,
    jd_rnc.ket
  FROM tb_krs krs
  JOIN tb_jadwal jd ON krs.ID_JADWAL = jd.ID_JADWAL
  JOIN tb_jadwal_rinci jd_rnc ON jd.ID_JADWAL = jd_rnc.id_jadwal
  WHERE krs.NIM = ?
  AND jd.th_akdm = '${thn_akdm}'
  AND jd_rnc.th_akdm = '${thn_akdm}'
  AND jd_rnc.tgl BETWEEN ? AND ?
  ORDER BY jd_rnc.tgl ASC, jd_rnc.jam_awal ASC`;
  return dbPool.execute(SQLQuery, [NIM, startDate, endDate]);
};

module.exports = { getSchedulesToday, getSchedulesWeekly };
