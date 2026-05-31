const { taskSubmissionService } = require("../services");

class TaskSubmissionController {
  static async getAll(req, res, next) {
    try {
      const submissions = await taskSubmissionService.findAll();

      res.status(200).json(submissions);
    } catch (error) {
      next(error);
    }
  }

  static async getByTask(req, res, next) {
    try {
      const submissions = await taskSubmissionService.findAllByTask(
        req.params.TaskId,
      );

      res.status(200).json(submissions);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const submission = await taskSubmissionService.create({
        ...req.body,
        UserId: req.user.id,
      });

      res.status(201).json(submission);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskSubmissionController;
