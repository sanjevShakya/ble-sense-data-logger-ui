import http from "../utils/http";

class CRUD {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getByIdEnpoint(id) {
    return `${this.endpoint}/${id}`;
  }

  get() {
    return http.get(this.endpoint);
  }

  getById(id) {
    return http.get(this.getByIdEnpoint(id));
  }

  put(id, body) {
    return http.get(this.getByIdEnpoint(id), { body });
  }

  post(body) {
    return http.post(this.endpoint, { body });
  }

  delete(id) {
    return http.delete(this.getByIdEnpoint(id));
  }
}

export default CRUD;
