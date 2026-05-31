const { AssessmentResult } = require("../models");

class AssessmentResultService {
  static async create(currentUser, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return AssessmentResult.create(data);
  }

  static async findAll() {
    return AssessmentResult.findAll();
  }

  static async findBySubmission(TaskSubmissionId) {
    return AssessmentResult.findOne({
      where: { TaskSubmissionId },
    });
  }

  static async findById(id) {
    return AssessmentResult.findByPk(id);
  }

  static async update(id, data, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const result = await AssessmentResult.findByPk(id);

    if (!result) {
      throw new Error("Assessment result not found");
    }

    return result.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const result = await AssessmentResult.findByPk(id);

    if (!result) {
      throw new Error("Assessment result not found");
    }

    return result.destroy();
  }
}

module.exports = AssessmentResultService;
