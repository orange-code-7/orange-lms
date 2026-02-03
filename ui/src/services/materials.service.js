import api from "./api";

const MaterialService = {
  getAll: async () => {
    const res = await api.get("/materials/all"); // GET /materials
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/materials/${id}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/materials", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/materials/${id}`, payload);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/materials/${id}`);
    return res.data;
  },
};

export default MaterialService;
