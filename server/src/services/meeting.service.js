const { Meeting, Class, User, Task, Note, Material } = require("../models");

const ROLES = require("../constants/roles");

class MeetingService {
  static async findAllByClass(ClassId) {
    return Meeting.findAll({
      where: { ClassId },
      include: [
        {
          model: Class,
          as: "class",
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  static async getAll(currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return Meeting.findAll({
        include: [
          {
            model: Class,
            as: "class",
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return Meeting.findAll({
        include: [
          {
            model: Class,
            as: "class",
            where: {
              MentorId: currentUser.id,
            },
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return Meeting.findAll({
        include: [
          {
            model: Class,
            as: "class",
            required: true,
            include: [
              {
                model: User,
                as: "mentees",
                attributes: [],
                through: {
                  attributes: [],
                },
                where: {
                  id: currentUser.id,
                },
              },
            ],
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }

    throw new Error("Unauthorized");
  }

  static async findById(id) {
    return Meeting.findByPk(id, {
      include: [
        {
          model: Class,
          as: "class",
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
        {
          model: Task,
          as: "tasks",
        },
        {
          model: Note,
          as: "notes",
        },
        {
          model: Material,
          as: "materials",
        },
      ],
    });
  }

  static async create(currentUser, classId, data) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return Meeting.create({
      ...data,
      ClassId: classId,
      createdBy: currentUser.id,
    });
  }

  static async update(id, data, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return meeting.update(data);
  }

  static async delete(id, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return meeting.destroy();
  }
}

module.exports = MeetingService;
