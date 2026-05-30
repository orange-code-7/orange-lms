const { Task, Meeting } = require("../models");

class TaskService {
  static async findAllByMeeting(MeetingId) {
    return Task.findAll({
      where: { MeetingId },
    });
  }

  static async getAll() {
    return Task.findAll();
  }

  static async findById(id) {
    return Task.findByPk(id);
  }

  static async create(currentUser, meetingId, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
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
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
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
