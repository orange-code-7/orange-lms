const { Material, Meeting, Class, User } = require("../models");
const ROLES = require("../constants/roles");

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

  static async getAll(currentUser) {
    /**
     * Owner & Admin
     */
    if ([ROLES.OWNER, ROLES.ADMIN].includes(currentUser.role)) {
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

    /**
     * Mentor
     */
    if (currentUser.role === ROLES.MENTOR) {
      return Material.findAll({
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
            as: "uploader",
          },
        ],
      });
    }

    /**
     * Mentee
     */
    if (currentUser.role === ROLES.MENTEE) {
      return Material.findAll({
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
            as: "uploader",
          },
        ],
      });
    }

    throw new Error("Unauthorized");
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
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
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

  static async update(id, data, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const material = await Material.findByPk(id);

    if (!material) {
      throw new Error("Material not found");
    }

    return material.update(data);
  }

  static async delete(id, currentUser) {
    if (![ROLES.ADMIN, ROLES.OWNER, ROLES.MENTOR].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const material = await Material.findByPk(id);

    if (!material) {
      throw new Error("Material not found");
    }

    return material.destroy();
  }
}

module.exports = MaterialService;
