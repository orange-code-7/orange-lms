const { Material, Meeting, Class, User } = require("../models");

class MaterialService {
  static async findAllByMeeting(MeetingId) {
    return Material.findAll({
      where: { MeetingId },
      include: [
        Meeting,
        Class,
        {
          model: User,
          as: "uploader",
        },
      ],
    });
  }

  static async getAll() {
    return Material.findAll({
      include: [
        Meeting,
        Class,
        {
          model: User,
          as: "uploader",
        },
      ],
    });
  }

  static async findById(id) {
    return Material.findByPk(id, {
      include: [
        Meeting,
        Class,
        {
          model: User,
          as: "uploader",
        },
      ],
    });
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
