const ROLES = require("../constants/roles");

module.exports = {
  user: {
    read: [ROLES.OWNER, ROLES.ADMIN],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER],
  },

  mentor: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER],
  },

  mentee: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER],
  },

  class: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  meeting: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  task: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    submit: [ROLES.MENTEE],
  },

  note: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
  },

  material: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
  },

  // Tambahan table baru
  attendance: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  taskCriteria: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  assessmentResult: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  score: {
    read: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR, ROLES.MENTEE],
    create: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    update: [ROLES.OWNER, ROLES.ADMIN, ROLES.MENTOR],
    delete: [ROLES.OWNER, ROLES.ADMIN],
  },

  historyClass: {
    read: [ROLES.OWNER, ROLES.ADMIN],
    create: [ROLES.OWNER, ROLES.ADMIN],
    update: [ROLES.OWNER, ROLES.ADMIN],
    delete: [ROLES.OWNER],
  },
};
