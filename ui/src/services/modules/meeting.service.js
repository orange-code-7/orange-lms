import api from "../api/api";
import ENDPOINTS from "../api/endpoints";

class MeetingService {
  static getAll(params) {
    return api.get(`${ENDPOINTS.MEETINGS}/all`, { params });
  }

  static getById(id) {
    return api.get(`${ENDPOINTS.MEETINGS}/${id}`);
  }

  static create(payload) {
    return api.post(ENDPOINTS.MEETINGS, payload);
  }

  static update(id, payload) {
    return api.put(`${ENDPOINTS.MEETINGS}/${id}`, payload);
  }

  static delete(id) {
    return api.delete(`${ENDPOINTS.MEETINGS}/${id}`);
  }
}

export default MeetingService;
