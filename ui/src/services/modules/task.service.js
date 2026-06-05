import api from "../api/api";
import ENDPOINTS from "../api/endpoints";

class TaskService {
  static getAll(params) {
    return api.get(`${ENDPOINTS.TASKS}/all`, { params });
  }

  static getById(id) {
    return api.get(`${ENDPOINTS.TASKS}/${id}`);
  }

  static create(payload) {
    return api.post(ENDPOINTS.TASKS, payload);
  }
  static createTaskByMeeting(meetingId, payload) {
    return api.post(`/meetings/${meetingId}/tasks`, payload);
  }
  static update(id, payload) {
    return api.put(`${ENDPOINTS.TASKS}/${id}`, payload);
  }

  static delete(id) {
    return api.delete(`${ENDPOINTS.TASKS}/${id}`);
  }
}

export default TaskService;
