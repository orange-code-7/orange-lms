"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    static associate(models) {
      Meeting.belongsTo(models.Class, {
        foreignKey: "ClassId",
        as: "class",
      });

      Meeting.hasMany(models.Task, {
        foreignKey: "MeetingId",
        onDelete: "CASCADE",
      });

      Meeting.hasMany(models.Note, {
        foreignKey: "MeetingId",
        onDelete: "CASCADE",
      });

      Meeting.hasMany(models.Material, {
        foreignKey: "MeetingId",
        onDelete: "CASCADE",
      });
    }
  }

  Meeting.init(
    {
      ClassId: DataTypes.INTEGER,
      meetingNumber: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      meetingDate: DataTypes.DATE,
      startHour: DataTypes.TIME,
      finishHour: DataTypes.TIME,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Meeting",
    },
  );

  return Meeting;
};
