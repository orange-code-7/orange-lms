const { mentorService, profileService } = require("../services");

class MentorController {
  static async getAll(req, res, next) {
    try {
      const mentors = await mentorService.findAll();

      res.status(200).json(mentors);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const mentor = await mentorService.findById(req.params.id);

      res.status(200).json(mentor);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const mentor = await mentorService.create(req.body);

      const profile = await profileService.create({
        userId: mentor.id,
      });

      res.status(201).json({
        message: "Mentor created",
        data: {
          mentor,
          profile,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const mentor = await mentorService.update(
        req.params.id,
        req.body,
        req.user,
      );

      res.status(200).json(mentor);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await mentorService.delete(req.params.id, req.user);

      res.status(200).json({
        message: "Mentor deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MentorController;
