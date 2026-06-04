const { materialService } = require("../services");

class MaterialController {
  static async getByMeeting(req, res, next) {
    try {
      const materials = await materialService.findAllByMeeting(
        +req.params.meetingId,
      );
      res.json(materials);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const materials = await materialService.getAll(req.user);
      res.json(materials);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const material = await materialService.create(
        req.user,
        req.params.meetingId,
        req.body,
      );
      res.status(201).json(material);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const material = await materialService.findById(req.params.id);
      res.json(material);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const material = await materialService.update(
        req.params.id,
        req.body,
        req.user,
      );
      res.json(material);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await materialService.delete(req.params.id, req.user);
      res.json({ message: "Material deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MaterialController;
