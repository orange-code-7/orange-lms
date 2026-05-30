"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.belongsTo(models.User, {
        foreignKey: "MentorId",
        as: "mentor",
      });

      Class.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
      });

      Class.belongsToMany(models.User, {
        through: models.ClassUser,
        foreignKey: "ClassId",
        otherKey: "UserId",
      });

      Class.hasMany(models.ClassUser, {
        foreignKey: "ClassId",
      });

      Class.hasMany(models.Meeting, {
        foreignKey: "ClassId",
        as: "meetings",
        onDelete: "CASCADE",
      });

      Class.hasMany(models.Note, {
        foreignKey: "ClassId",
        onDelete: "CASCADE",
      });

      Class.hasMany(models.Task, {
        foreignKey: "ClassId",
        onDelete: "CASCADE",
      });

      Class.hasMany(models.Material, {
        foreignKey: "ClassId",
        onDelete: "CASCADE",
      });
    }
  }

  Class.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      MentorId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      level: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    },
  );

  return Class;
};
