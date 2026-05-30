const { TaskSubmission } = require("../models");

class TaskSubmissionService {
  static async create(currentUser, data) {
    console.log(currentUser);
    if (currentUser.role !== "Mentee") {
      throw new Error("Only mentee can submit task");
    }

    return TaskSubmission.create({
      ...data,
      status: "Submitted",
    });
  }

  static async findAllByTask(TaskId) {
    return TaskSubmission.findAll({
      where: { TaskId },
    });
  }

  static async findById(id) {
    return TaskSubmission.findByPk(id);
  }

  static async findAll() {
    return TaskSubmission.findAll();
  }

  static async update(id, data, currentUser) {
    const submission = await TaskSubmission.findByPk(id);

    if (!submission) {
      throw new Error("Submission not found");
    }

    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return submission.update(data);
  }

  static async delete(id, currentUser) {
    const submission = await TaskSubmission.findByPk(id);

    if (!submission) {
      throw new Error("Submission not found");
    }

    if (
      currentUser.role !== "Owner" &&
      currentUser.role !== "Admin" &&
      currentUser.id !== submission.UserId
    ) {
      throw new Error("Permission denied");
    }

    return submission.destroy();
  }
}

module.exports = TaskSubmissionService;
