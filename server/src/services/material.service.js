const { Material, Meeting } = require("../models");

class MaterialService {
  static async findAllByMeeting(MeetingId) {
    return Material.findAll({
      where: { MeetingId },
    });
  }

  static async getAll() {
    return Material.findAll();
  }

  static async findById(id) {
    return Material.findByPk(id);
  }

  static async create(currentUser, meetingId, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return Material.create({
      ...data,
      MeetingId: Number(meetingId),
      ClassId: meeting.ClassId,
      uploadedBy: currentUser.id,
    });
  }

  static async update(id, data) {
    const material = await Material.findByPk(id);

    if (!material) throw new Error("Material not found");

    return material.update(data);
  }

  static async delete(id) {
    const material = await Material.findByPk(id);

    if (!material) throw new Error("Material not found");

    return material.destroy();
  }
}

module.exports = MaterialService;
