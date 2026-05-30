const { profileService } = require("../services");

class ProfileController {
  static async getByUser(req, res, next) {
    try {
      const profile = await profileService.findByUserId(req.params.id);

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createOrUpdate(req, res, next) {
    try {
      const profile = await profileService.createOrUpdate(
        req.params.id,
        req.body,
      );

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
