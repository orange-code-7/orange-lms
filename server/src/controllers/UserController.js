const { userService, profileService } = require("../services");

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await userService.findAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await userService.findById(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const user = await userService.create(req.body);

      await profileService.upsert(user.id, {});

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const updatedUser = await userService.update(
        req.params.id,
        req.body,
        req.user,
      );

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await userService.delete(req.params.id, req.user);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
