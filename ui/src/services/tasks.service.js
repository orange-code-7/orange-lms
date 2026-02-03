import api from "./api";

const TaskService = {
  getAll: async () => {
    const res = await api.get("/tasks/all"); // GET /tasks
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/tasks", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/tasks/${id}`, payload);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  },
};

export default TaskService;
