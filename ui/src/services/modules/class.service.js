import api from "../api/api";
import ENDPOINTS from "../api/endpoints";

class ClassService {
  static getAll(params) {
    return api.get(ENDPOINTS.CLASSES, { params });
  }

  static getById(id) {
    return api.get(`${ENDPOINTS.CLASSES}/${id}`);
  }

  static create(payload) {
    return api.post(ENDPOINTS.CLASSES, payload);
  }

  static update(id, payload) {
    return api.put(`${ENDPOINTS.CLASSES}/${id}`, payload);
  }

  static delete(id) {
    return api.delete(`${ENDPOINTS.CLASSES}/${id}`);
  }
}

export default ClassService;
