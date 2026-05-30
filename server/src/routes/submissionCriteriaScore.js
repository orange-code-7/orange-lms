const express = require("express");
const router = express.Router();

const { SubmissionCriteriaScoreController } = require("../controllers");
const { authorization } = require("../middlewares");

router.get(
  "/submission/:submissionId",
  authorization("score", "read"),
  SubmissionCriteriaScoreController.getBySubmission,
);

router.post(
  "/",
  authorization("score", "create"),
  SubmissionCriteriaScoreController.create,
);

router.put(
  "/:id",
  authorization("score", "update"),
  SubmissionCriteriaScoreController.update,
);

router.delete(
  "/:id",
  authorization("score", "delete"),
  SubmissionCriteriaScoreController.delete,
);

module.exports = router;
