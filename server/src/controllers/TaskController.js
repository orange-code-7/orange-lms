const { taskService, taskSubmissionService } = require("../services");

class TaskController {
  static async getByMeeting(req, res, next) {
    try {
      const tasks = await taskService.findAllByMeeting(+req.params.meetingId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAll();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const task = await taskService.create(
        req.user,
        req.params.meetingId,
        req.body,
      );

      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const task = await taskService.findById(req.params.id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const task = await taskService.update(req.params.id, req.body, req.user);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await taskService.delete(req.params.id, req.user);
      res.json({ message: "Task deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async submitTask(req, res, next) {
    try {
      const submission = await taskSubmissionService.create(req.user, {
        TaskId: req.params.id,
        UserId: req.user.id,
        submissionUrl: req.body.submissionUrl,
      });

      res.status(201).json(submission);
    } catch (err) {
      next(err);
    }
  }

  static async getSubmissions(req, res, next) {
    try {
      const submissions = await taskSubmissionService.findAllByTask(
        req.params.id,
      );
      res.json(submissions);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
