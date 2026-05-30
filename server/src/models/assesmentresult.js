"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AssessmentResult extends Model {
    static associate(models) {
      AssessmentResult.belongsTo(models.TaskSubmission, {
        foreignKey: "TaskSubmissionId",
      });

      AssessmentResult.belongsTo(models.User, {
        foreignKey: "gradedBy",
        as: "grader",
      });

      AssessmentResult.hasMany(models.SubmissionCriteriaScore, {
        foreignKey: "AssessmentResultId",
        onDelete: "CASCADE",
      });
    }
  }

  AssessmentResult.init(
    {
      TaskSubmissionId: DataTypes.INTEGER,
      gradedBy: DataTypes.INTEGER,
      finalScore: DataTypes.DECIMAL,
      mentorFeedback: DataTypes.TEXT,
      gradedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "AssessmentResult",
    },
  );

  return AssessmentResult;
};
