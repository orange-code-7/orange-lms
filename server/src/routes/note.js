const express = require("express");
const router = express.Router({ mergeParams: true });

const { NoteController } = require("../controllers");
const { authorization } = require("../middlewares");

router.get("/", authorization("note", "read"), NoteController.getByMeeting);

router.post("/", authorization("note", "create"), NoteController.create);

router.get("/all", authorization("note", "read"), NoteController.getAll);

router.get("/:id", authorization("note", "read"), NoteController.getById);

router.put("/:id", authorization("note", "update"), NoteController.update);

router.delete("/:id", authorization("note", "delete"), NoteController.delete);

module.exports = router;
