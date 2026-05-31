const { ClassUser, User } = require("../models");

class ClassUserService {
  static async enrollMentee({ ClassId, UserId }) {
    return ClassUser.create({
      ClassId,
      UserId,
      roleInClass: "Mentee",
      progressPercentage: 0,
      status: "Active",
    });
  }

  static async assignMentor({ ClassId, UserId }) {
    return ClassUser.create({
      ClassId,
      UserId,
      roleInClass: "Mentor",
      progressPercentage: 0,
      status: "Active",
    });
  }

  static async getUsers(ClassId) {
    return ClassUser.findAll({
      where: { ClassId },
      include: User,
    });
  }

  static async getMentees(ClassId) {
    return ClassUser.findAll({
      where: {
        ClassId,
        roleInClass: "Mentee",
      },
      include: User,
    });
  }

  static async getMentor(ClassId) {
    return ClassUser.findOne({
      where: {
        ClassId,
        roleInClass: "Mentor",
      },
      include: User,
    });
  }
}

module.exports = ClassUserService;
