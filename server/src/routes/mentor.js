const express = require("express");
const router = express.Router();

const { MentorController, ProfileController } = require("../controllers");

router.get("/", MentorController.getAll);
router.get("/:id", MentorController.getById);

router.get("/:id/profile", ProfileController.getByUser);
router.post("/:id/profile", ProfileController.createOrUpdate);

module.exports = router;
