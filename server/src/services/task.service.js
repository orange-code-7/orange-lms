const { Task, Meeting, Class, User } = require("../models");
const ROLES = require("../constants/roles");

class TaskService {
  static async findAllByMeeting(MeetingId) {
    return Task.findAll({
      where: { MeetingId },
      include: [
        Meeting,
        Class,
        {
          model: User,
          as: "creator",
        },
      ],
    });
  }

  static async getAll(currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
      return Task.findAll({
        include: [
          Meeting,
          Class,
          {
            model: User,
            as: "creator",
          },
        ],
      });
    }

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return Task.findAll({
        include: [
          Meeting,
          {
            model: Class,
            where: {
              MentorId: currentUser.id,
            },
          },
          {
            model: User,
            as: "creator",
          },
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return Task.findAll({
        include: [
          Meeting,
          {
            model: Class,
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
          },
        ],
      });
    }

    throw new Error("Unauthorized");
  }

  static async findById(id) {
    return Task.findByPk(id, {
      include: [
        Meeting,
        Class,
        {
          model: User,
          as: "creator",
        },
      ],
    });
  }

  static async create(currentUser, meetingId, data) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return Task.create({
      ...data,
      MeetingId: Number(meetingId),
      ClassId: meeting.ClassId,
      createdBy: currentUser.id,
    });
  }

  static async update(id, data, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task.update(data);
  }

  static async delete(id, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task.destroy();
  }
}

module.exports = TaskService;
