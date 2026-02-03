import api from "./api";

const MeetingService = {
  getAll: async () => {
    const res = await api.get("/meetings/all"); // GET /meetings
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/meetings/${id}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/meetings", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/meetings/${id}`, payload);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/meetings/${id}`);
    return res.data;
  },
};

export default MeetingService;
