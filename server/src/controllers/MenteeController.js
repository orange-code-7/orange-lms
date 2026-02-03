const { menteeService } = require("../services");

class MenteeController {
  static async getAll(req, res, next) {
    try {
      const users = await menteeService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await menteeService.findById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MenteeController;
