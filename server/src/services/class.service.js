const { User, Class, Meeting, Task, Note, Material } = require("../models");

const ROLES = require("../constants/roles");

class ClassService {
  static async getAll(currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return Class.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentor",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentees",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
          },
          {
            model: Meeting,
            as: "meetings",
          },
          {
            model: Note,
            as: "notes",
          },
          {
            model: Task,
            as: "tasks",
          },
          {
            model: Material,
            as: "materials",
          },
        ],
      });
    }

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return Class.findAll({
        order: [["id", "ASC"]],
        where: {
          MentorId: currentUser.id,
        },
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentor",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentees",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
          },
          {
            model: Meeting,
            as: "meetings",
          },
          {
            model: Note,
            as: "notes",
          },
          {
            model: Task,
            as: "tasks",
          },
          {
            model: Material,
            as: "materials",
          },
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return Class.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentor",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "mentees",
            attributes: [],
            through: { attributes: [] },
            where: {
              id: currentUser.id,
            },
          },
          {
            model: Meeting,
            as: "meetings",
          },
          {
            model: Note,
            as: "notes",
          },
          {
            model: Task,
            as: "tasks",
          },
          {
            model: Material,
            as: "materials",
          },
        ],
      });
    }

    throw new Error("Unauthorized");
  }

  static async findById(id) {
    return Class.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "mentor",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "mentees",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
        {
          model: Meeting,
          as: "meetings",
        },
        {
          model: Note,
          as: "notes",
        },
        {
          model: Task,
          as: "tasks",
        },
        {
          model: Material,
          as: "materials",
        },
      ],
    });
  }

  static async create(data, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return Class.create({
      ...data,
      createdBy: currentUser.id,
    });
  }

  static async update(id, data, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const cls = await Class.findByPk(id);

    if (!cls) {
      throw new Error("Class not found");
    }

    return cls.update(data);
  }

  static async delete(id, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const cls = await Class.findByPk(id);

    if (!cls) {
      throw new Error("Class not found");
    }

    await Meeting.destroy({
      where: { ClassId: id },
    });

    await Task.destroy({
      where: { ClassId: id },
    });

    await Note.destroy({
      where: { ClassId: id },
    });

    await Material.destroy({
      where: { ClassId: id },
    });

    return cls.destroy();
  }
}

module.exports = ClassService;
