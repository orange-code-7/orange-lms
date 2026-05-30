const { taskSubmissionService } = require("../services");

class TaskSubmissionController {
  static async submit(req, res, next) {
    try {
      const submission = await taskSubmissionService.create({
        taskId: req.params.taskId,
        userId: req.user.id,
        submissionUrl: req.body.submissionUrl,
      });

      res.status(201).json(submission);
    } catch (error) {
      next(error);
    }
  }

  static async grade(req, res, next) {
    try {
      const submission = await taskSubmissionService.grade(
        req.user,
        req.params.id,
        req.body.score,
        req.body.feedback,
      );

      res.status(200).json({
        message: "Task graded",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const submissions = await taskSubmissionService.findAll();

      res.status(200).json(submissions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskSubmissionController;
