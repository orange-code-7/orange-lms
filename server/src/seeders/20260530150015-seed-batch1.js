"use strict";

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "batch1.json"), "utf-8"),
);

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    /**
     * USERS
     */
    const users = data.users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Users", users, {});

    /**
     * PROFILES
     */
    const profiles = data.profiles.map((profile) => ({
      ...profile,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Profiles", profiles, {});

    /**
     * CLASSES
     */
    const classes = data.classes.map((cls) => ({
      ...cls,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Classes", classes, {});

    /**
     * MEETINGS
     */
    const meetings = data.meetings.map((meeting) => ({
      ...meeting,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Meetings", meetings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Meetings", null, {});
    await queryInterface.bulkDelete("Classes", null, {});
    await queryInterface.bulkDelete("Profiles", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
