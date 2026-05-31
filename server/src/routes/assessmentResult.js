const express = require("express");
const router = express.Router();

const { AssessmentResultController } = require("../controllers");
const { authorization } = require("../middlewares");

router.get(
  "/",
  authorization("assessment", "read"),
  AssessmentResultController.getAll,
);

router.post(
  "/",
  authorization("assessment", "create"),
  AssessmentResultController.create,
);

router.get(
  "/submission/:submissionId",
  authorization("assessment", "read"),
  AssessmentResultController.getBySubmission,
);

router.put(
  "/:id",
  authorization("assessment", "update"),
  AssessmentResultController.update,
);

router.delete(
  "/:id",
  authorization("assessment", "delete"),
  AssessmentResultController.delete,
);

module.exports = router;
