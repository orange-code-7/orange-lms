const { Note, Meeting, Class, User } = require("../models");

class NoteService {
  static async findAllByMeeting(MeetingId) {
    return Note.findAll({
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

  static async getAll() {
    return Note.findAll({
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

  static async findById(id) {
    return Note.findByPk(id, {
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
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return Note.create({
      ...data,
      MeetingId: Number(meetingId),
      ClassId: meeting.ClassId,
      createdBy: currentUser.id,
    });
  }

  static async update(id, data, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const note = await Note.findByPk(id);

    if (!note) {
      throw new Error("Note not found");
    }

    return note.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const note = await Note.findByPk(id);

    if (!note) {
      throw new Error("Note not found");
    }

    return note.destroy();
  }
}

module.exports = NoteService;
