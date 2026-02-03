const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const classRoutes = require("./class");
const meetingRoutes = require("./meeting");
const taskRoutes = require("./task");
const noteRoutes = require("./note");
const materialRoutes = require("./material");
const mentorRoutes = require("./mentor");
const menteeRoutes = require("./mentee");

/**
 * =====================
 * Core Resources
 * =====================
 */
router.use("/users", userRoutes);
router.use("/classes", classRoutes);

/**
 * =====================
 * Relation-Aware Nested Routes
 * =====================
 */
router.use("/classes/:classId/meetings", meetingRoutes);
router.use("/meetings/:meetingId/tasks", taskRoutes);
router.use("/meetings/:meetingId/notes", noteRoutes);
router.use("/meetings/:meetingId/materials", materialRoutes);

/**
 * =====================
 * Optional Flat Access
 * =====================
 */
router.use("/meetings", meetingRoutes);
router.use("/tasks", taskRoutes);
router.use("/notes", noteRoutes);
router.use("/materials", materialRoutes);

// Mentor and Mentee
router.use("/mentors", mentorRoutes);
router.use("/mentees", menteeRoutes);

/**
 * =====================
 * Health Check
 * =====================
 */
router.get("/", (req, res) => {
  res.json({ message: "Orange LMS Server is running 🚀" });
});

module.exports = router;
