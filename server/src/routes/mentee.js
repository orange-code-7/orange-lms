const express = require("express");
const router = express.Router();

const { MenteeController, ProfileController } = require("../controllers");

router.get("/", MenteeController.getAll);
router.get("/:id", MenteeController.getById);

router.get("/:id/profile", ProfileController.getByUser);
router.post("/:id/profile", ProfileController.createOrUpdate);

module.exports = router;
