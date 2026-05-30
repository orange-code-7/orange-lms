const { TaskSubmission } = require("../models");

class TaskSubmissionService {
  static async create(data) {
    return TaskSubmission.create({
      ...data,
      status: "submitted",
    });
  }

  static async findAllByTask(taskId) {
    return TaskSubmission.findAll({
      where: { taskId },
    });
  }

  static async findAll() {
    return TaskSubmission.findAll();
  }
}

module.exports = TaskSubmissionService;
