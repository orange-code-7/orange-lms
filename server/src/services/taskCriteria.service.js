const { TaskCriteria } = require("../models");

class TaskCriteriaService {
  static async create(currentUser, data) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    return TaskCriteria.create(data);
  }

  static async findAllByTask(TaskId) {
    return TaskCriteria.findAll({
      where: { TaskId },
      order: [["id", "ASC"]],
    });
  }

  static async findById(id) {
    return TaskCriteria.findByPk(id);
  }

  static async update(id, data, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const criteria = await TaskCriteria.findByPk(id);

    if (!criteria) {
      throw new Error("Criteria not found");
    }

    return criteria.update(data);
  }

  static async delete(id, currentUser) {
    if (!["Admin", "Owner", "Mentor"].includes(currentUser.role)) {
      throw new Error("Permission denied");
    }

    const criteria = await TaskCriteria.findByPk(id);

    if (!criteria) {
      throw new Error("Criteria not found");
    }

    return criteria.destroy();
  }
}

module.exports = TaskCriteriaService;
