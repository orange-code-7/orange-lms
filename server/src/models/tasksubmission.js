"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TaskSubmission extends Model {
    static associate(models) {
      TaskSubmission.belongsTo(models.Task, {
        foreignKey: "TaskId",
      });

      TaskSubmission.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      TaskSubmission.hasOne(models.AssessmentResult, {
        foreignKey: "TaskSubmissionId",
        onDelete: "CASCADE",
      });
    }
  }

  TaskSubmission.init(
    {
      TaskId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      submissionUrl: DataTypes.STRING,
      submittedNote: DataTypes.TEXT,
      status: DataTypes.STRING,
      submittedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TaskSubmission",
    },
  );

  return TaskSubmission;
};
