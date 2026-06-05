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

  // Bulk Insert Mentees
  static async enrollMentees(ClassId, UserIds) {
    const results = [];

    for (const UserId of UserIds) {
      const existing = await ClassUser.findOne({
        where: {
          ClassId,
          UserId,
        },
      });

      if (!existing) {
        const enrollment = await ClassUser.create({
          ClassId,
          UserId,
          roleInClass: "Mentee",
          progressPercentage: 0,
          status: "Active",
        });

        results.push(enrollment);
      }
    }

    return results;
  }
  static async removeMentee(ClassId, UserId) {
    return ClassUser.destroy({
      where: {
        ClassId,
        UserId,
        roleInClass: "Mentee",
      },
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
