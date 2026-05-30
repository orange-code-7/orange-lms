"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SubmissionCriteriaScore extends Model {
    static associate(models) {
      SubmissionCriteriaScore.belongsTo(models.AssessmentResult, {
        foreignKey: "AssessmentResultId",
      });

      SubmissionCriteriaScore.belongsTo(models.TaskCriteria, {
        foreignKey: "TaskCriteriaId",
      });
    }
  }

  SubmissionCriteriaScore.init(
    {
      AssessmentResultId: DataTypes.INTEGER,
      TaskCriteriaId: DataTypes.INTEGER,
      score: DataTypes.DECIMAL,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SubmissionCriteriaScore",
    },
  );

  return SubmissionCriteriaScore;
};
