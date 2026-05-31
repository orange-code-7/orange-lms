"use strict";

const fs = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "batch2.json"), "utf-8"),
);

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    /**
     * TASKS
     */
    const tasks = data.tasks.map((task) => ({
      ...task,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Tasks", tasks, {});

    /**
     * NOTES
     */
    const notes = data.notes.map((note) => ({
      ...note,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Notes", notes, {});

    /**
     * MATERIALS
     */
    const materials = data.materials.map((material) => ({
      ...material,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("Materials", materials, {});

    /**
     * CLASS USERS
     */
    const classUsers = data.classUsers.map((item) => ({
      ...item,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("ClassUsers", classUsers, {});

    /**
     * TASK SUBMISSIONS
     */
    const taskSubmissions = data.taskSubmissions.map((submission) => ({
      ...submission,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("TaskSubmissions", taskSubmissions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TaskSubmissions", null, {});
    await queryInterface.bulkDelete("ClassUsers", null, {});
    await queryInterface.bulkDelete("Materials", null, {});
    await queryInterface.bulkDelete("Notes", null, {});
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
