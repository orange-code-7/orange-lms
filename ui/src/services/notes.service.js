import api from "./api";

const NoteService = {
  getAll: async () => {
    const res = await api.get("/notes/all"); // GET /notes
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/notes", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/notes/${id}`, payload);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
  },
};

export default NoteService;
