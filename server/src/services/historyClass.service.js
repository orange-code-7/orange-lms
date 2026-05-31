const { HistoryClass, Class, User } = require("../models");

class HistoryClassService {
  static async findAll() {
    return HistoryClass.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Class,
          attributes: ["id", "code", "name", "category", "level"],
        },
        {
          model: User,
          as: "mentor",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  static async findById(id) {
    const history = await HistoryClass.findByPk(id, {
      include: [
        {
          model: Class,
          attributes: ["id", "code", "name"],
        },
        {
          model: User,
          as: "mentor",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!history) throw new Error("History class not found");

    return history;
  }

  static async archive(classId, currentUser) {
    if (!["Owner", "Admin"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const cls = await Class.findByPk(classId);

    if (!cls) throw new Error("Class not found");

    const history = await HistoryClass.create({
      classId: cls.id,
      code: cls.code,
      name: cls.name,
      category: cls.category,
      level: cls.level,
      mentorId: cls.mentorId,
      startDate: cls.startDate,
      endDate: cls.endDate,
      status: "Completed",
      archivedAt: new Date(),
    });

    await cls.update({
      status: "Archived",
    });

    return history;
  }

  static async restore(id, currentUser) {
    if (!["Owner", "Admin"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const history = await HistoryClass.findByPk(id);

    if (!history) throw new Error("History class not found");

    const cls = await Class.findByPk(history.classId);

    if (!cls) throw new Error("Original class not found");

    await cls.update({
      status: "Active",
    });

    await history.destroy();

    return {
      message: "Class restored successfully",
    };
  }

  static async delete(id, currentUser) {
    if (!["Owner"].includes(currentUser.role)) {
      throw new Error("Only owner can delete history");
    }

    const history = await HistoryClass.findByPk(id);

    if (!history) throw new Error("History class not found");

    await history.destroy();

    return true;
  }
}

module.exports = HistoryClassService;
