const { Attendance } = require("../models");

class AttendanceService {
  static async markAttendance(currentUser, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return Attendance.create(data);
  }

  static async findAllByMeeting(MeetingId) {
    return Attendance.findAll({
      where: { MeetingId },
    });
  }

  static async findByUser(UserId) {
    return Attendance.findAll({
      where: { UserId },
    });
  }

  static async updateStatus(id, data, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const attendance = await Attendance.findByPk(id);

    if (!attendance) {
      throw new Error("Attendance not found");
    }

    return attendance.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const attendance = await Attendance.findByPk(id);

    if (!attendance) {
      throw new Error("Attendance not found");
    }

    return attendance.destroy();
  }
}

module.exports = AttendanceService;
