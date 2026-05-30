const { Class, Meeting, Task, Note, Material } = require("../models");

class MeetingService {
  static async findAllByClass(classId) {
    return Meeting.findAll({
      where: { classId },
      include: [
        {
          model: Class,
          as: "class",
        },
        Task,
        Note,
        Material,
      ],
    });
  }

  static async getAll() {
    return Meeting.findAll({
      include: [
        {
          model: Class,
          as: "class",
        },
        Task,
        Note,
        Material,
      ],
    });
  }

  static async findById(id) {
    return Meeting.findByPk(id, {
      include: [
        {
          model: Class,
          as: "class",
        },
        Task,
        Note,
        Material,
      ],
    });
  }

  static async create(currentUser, classId, data) {
    return Meeting.create({
      classId,
      ...data,
    });
  }

  static async update(id, data) {
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return meeting.update(data);
  }

  static async delete(id) {
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return meeting.destroy();
  }
}

module.exports = MeetingService;
