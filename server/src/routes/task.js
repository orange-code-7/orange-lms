const express = require("express");
const router = express.Router({ mergeParams: true });

const { TaskController } = require("../controllers");
const { authorization } = require("../middlewares");

router.get("/", authorization("task", "read"), TaskController.getByMeeting);

router.post("/", authorization("task", "create"), TaskController.create);

router.get("/all", authorization("task", "read"), TaskController.getAll);

router.get("/:id", authorization("task", "read"), TaskController.getById);

router.put("/:id", authorization("task", "update"), TaskController.update);

router.delete("/:id", authorization("task", "delete"), TaskController.delete);

router.post(
  "/:id/submit",
  authorization("task", "submit"),
  TaskController.submitTask,
);

router.get(
  "/:id/submissions",
  authorization("task", "read"),
  TaskController.getSubmissions,
);

module.exports = router;
