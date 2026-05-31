"use strict";

const fs = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "batch3.json"), "utf-8"),
);

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    /**
     * ATTENDANCES
     */
    const attendances = data.attendances.map((attendance) => ({
      ...attendance,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Attendances", attendances, {});

    /**
     * TASK CRITERIA
     */
    const taskCriteria = data.taskCriteria.map((criteria) => ({
      ...criteria,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("TaskCriteria", taskCriteria, {});

    /**
     * ASSESSMENT RESULTS
     */
    const assessmentResults = data.assessmentResults.map((result) => ({
      ...result,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("AssessmentResults", assessmentResults, {});

    /**
     * SUBMISSION CRITERIA SCORES
     */
    const submissionCriteriaScores = data.submissionCriteriaScores.map(
      (score) => ({
        ...score,
        createdAt: now,
        updatedAt: now,
      }),
    );

    await queryInterface.bulkInsert(
      "SubmissionCriteriaScores",
      submissionCriteriaScores,
      {},
    );

    /**
     * HISTORY CLASSES
     */
    const historyClasses = data.historyClasses.map((history) => ({
      ...history,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("HistoryClasses", historyClasses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("HistoryClasses", null, {});
    await queryInterface.bulkDelete("SubmissionCriteriaScores", null, {});
    await queryInterface.bulkDelete("AssessmentResults", null, {});
    await queryInterface.bulkDelete("TaskCriteria", null, {});
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
