const { mentorService } = require("../services");

class MentorController {
  static async getAll(req, res, next) {
    try {
      const users = await mentorService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await mentorService.findById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MentorController;
