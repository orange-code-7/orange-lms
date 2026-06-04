const UI_PERMISSIONS = {
  Owner: {
    dashboard: ["read"],

    mentor: ["read", "create", "update", "delete"],
    mentee: ["read", "create", "update", "delete"],

    class: ["read", "create", "update", "delete"],
    meeting: ["read", "create", "update", "delete"],

    task: ["read", "create", "update", "delete"],
    note: ["read", "create", "update", "delete"],
    material: ["read", "create", "update", "delete"],

    attendance: ["read", "create", "update", "delete"],

    historyClass: ["read", "create", "update", "delete"],

    profile: ["read", "update"],
    setting: ["read", "update"],
  },

  Admin: {
    dashboard: ["read"],

    mentor: ["read", "create", "update"],
    mentee: ["read", "create", "update"],

    class: ["read", "create", "update", "delete"],
    meeting: ["read", "create", "update", "delete"],

    task: ["read", "create", "update", "delete"],
    note: ["read", "create", "update", "delete"],
    material: ["read", "create", "update", "delete"],

    attendance: ["read", "create", "update", "delete"],

    historyClass: ["read", "create", "update"],

    profile: ["read", "update"],
    setting: ["read", "update"],
  },

  Mentor: {
    dashboard: ["read"],

    mentee: ["read"],

    class: ["read"],
    meeting: ["read"],

    task: ["read", "create", "update", "delete"],
    note: ["read", "create", "update", "delete"],
    material: ["read", "create", "update", "delete"],

    attendance: ["read", "create", "update"],

    profile: ["read", "update"],
    setting: ["read", "update"],
  },

  Mentee: {
    dashboard: ["read"],

    class: ["read"],
    meeting: ["read"],

    task: ["read"],
    note: ["read"],
    material: ["read"],

    attendance: ["read"],

    profile: ["read", "update"],
    setting: ["read", "update"],
  },
};

export default UI_PERMISSIONS;
