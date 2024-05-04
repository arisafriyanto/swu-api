const ScheduleModel = require("./../models/schedules");
const helper = require("./../utils/helper");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");

const getSchedules = async (req, res) => {
  try {
    const { NIM } = req.student;
    const { date, startDate } = req.query;

    const validTypes = ["today", "weekly"];
    if (!validTypes.includes(date)) {
      throw new Error("Invalid parameter");
    }

    const today = moment();
    const currentMonth = today.month() + 1;
    // console.log(today);
    // console.log(currentMonth);

    // Menentukan semester berdasarkan bulan saat ini
    // Semester genap dimulai dari bulan Maret hingga bulan Agustus
    const semester = currentMonth >= 3 && currentMonth <= 8 ? 2 : 1;
    // console.log(semester);

    // Menentukan tahun akademik berdasarkan bulan saat ini
    const tahun_akademik =
      currentMonth >= 9
        ? `${today.year()}/${today.year() + 1}`
        : `${today.year() - 1}/${today.year()}`;

    const fullThnAkdm = `${semester}${tahun_akademik}`; // 22023/2024
    // console.log(tahun_akademik);
    // console.log(fullThnAkdm);

    const result = [];

    if (date === "today") {
      const startOfDay = moment(startDate).startOf("day").format("YYYY-MM-DD");
      // console.log(startOfDay);

      const [rows] = await ScheduleModel.getSchedulesToday(NIM, fullThnAkdm, startOfDay);
      result.push(...rows);
    }

    if (date === "weekly") {
      const startOfWeek = moment(startDate).startOf("week").format("YYYY-MM-DD");
      const endOfWeek = moment(startDate).endOf("week").format("YYYY-MM-DD");
      // console.log(startOfWeek);
      // console.log(endOfWeek);

      const [rows] = await ScheduleModel.getSchedulesWeekly(
        NIM,
        fullThnAkdm,
        startOfWeek,
        endOfWeek
      );
      result.push(...rows);
    }

    // console.log(result);

    if (result.length < 1) {
      throw new Error(
        `Maaf, tidak ada jadwal kuliah untuk ${date === "today" ? "hari" : "minggu"} ini 😥`
      );
    }

    result.map((item) => {
      const splitted = item.ket.split(" ");
      const link = splitted[0].replace(/^https?:\/\//, "");
      const passcode = splitted[splitted.length - 1];

      item.link = link;
      item.passcode = passcode;
      item.tgl_awal = moment(item.tgl_awal).locale("id").format("dddd, DD MMMM YYYY");
      item.nm_mk = helper.capitalizeWords(item.nm_mk);
    });

    const response = res.status(200).json({
      status: "success",
      message: `Get ${date} schedules successfully`,
      data: result,
    });

    return response;
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: [],
    });
  }
};

module.exports = { getSchedules };
