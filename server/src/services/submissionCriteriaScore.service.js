const { SubmissionCriteriaScore } = require("../models");

class SubmissionCriteriaScoreService {
  static async create(currentUser, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return SubmissionCriteriaScore.create(data);
  }

  static async findAllBySubmission(TaskSubmissionId) {
    return SubmissionCriteriaScore.findAll({
      where: { TaskSubmissionId },
    });
  }

  static async findById(id) {
    return SubmissionCriteriaScore.findByPk(id);
  }

  static async update(id, data, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const score = await SubmissionCriteriaScore.findByPk(id);

    if (!score) {
      throw new Error("Score not found");
    }

    return score.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const score = await SubmissionCriteriaScore.findByPk(id);

    if (!score) {
      throw new Error("Score not found");
    }

    return score.destroy();
  }
}

module.exports = SubmissionCriteriaScoreService;
