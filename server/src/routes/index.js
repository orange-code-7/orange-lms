const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const classRoutes = require("./class");
const meetingRoutes = require("./meeting");
const taskRoutes = require("./task");
const noteRoutes = require("./note");
const materialRoutes = require("./material");
const mentorRoutes = require("./mentor");
const menteeRoutes = require("./mentee");

const { authentication } = require("../middlewares");

/**
 * Health Check
 */
router.get("/", (req, res) => {
  res.json({
    message: "Orange LMS Server is running 🚀",
  });
});

/**
 * Public
 */
router.use("/auth", authRoutes);

/**
 * Protected
 */
router.use(authentication);

/**
 * User routes for testing
 */

const userRoutes = require("./user");
router.use("/users", userRoutes);

/**
 * User Domains
 */
router.use("/mentors", mentorRoutes);
router.use("/mentees", menteeRoutes);

/**
 * Learning Resources
 */
router.use("/classes", classRoutes);

router.use("/classes/:classId/meetings", meetingRoutes);

router.use("/meetings/:meetingId/tasks", taskRoutes);
router.use("/meetings/:meetingId/notes", noteRoutes);
router.use("/meetings/:meetingId/materials", materialRoutes);

router.use("/meetings", meetingRoutes);
router.use("/tasks", taskRoutes);
router.use("/notes", noteRoutes);
router.use("/materials", materialRoutes);

module.exports = router;
