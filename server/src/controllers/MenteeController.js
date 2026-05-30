const { menteeService, profileService } = require("../services");

class MenteeController {
  static async getAll(req, res, next) {
    try {
      const mentees = await menteeService.findAll();

      res.status(200).json(mentees);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const mentee = await menteeService.findById(req.params.id);

      res.status(200).json(mentee);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const mentee = await menteeService.create(req.body);

      const profile = await profileService.create({
        UserId: mentee.id,
      });

      res.status(201).json({
        message: "Mentee created",
        data: {
          mentee,
          profile,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const mentee = await menteeService.update(
        req.params.id,
        req.body,
        req.user,
      );

      res.status(200).json(mentee);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await menteeService.delete(req.params.id, req.user);

      res.status(200).json({
        message: "Mentee deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MenteeController;
