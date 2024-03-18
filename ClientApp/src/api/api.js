import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const api = {};

api.session = {
  create: (data = {}) => instance.post("/api/sessions", data),
  get: () => instance.get("/api/sessions"),
  delete: () => instance.delete("/api/sessions"),
};

api.user = {
  create: (data = {}) => instance.post("/api/users", data),
  getById: (userId = "") => instance.get("/api/users/" + userId),
  updateById: (userId = "", data = {}) => instance.put("/api/users/" + userId, data),
  deleteById: (userId = "") => instance.delete("/api/users/" + userId),
};

api.order = {
  create: (data = {}) => instance.post("/api/orders", data),
  getAll: (params = {}) => instance.get("/api/orders", { params }),
  getById: (orderId = "") => instance.get("/api/orders/" + orderId),
  updateById: (orderId = "", data = {}) => instance.put("/api/orders/" + orderId, data),
  deleteById: (orderId = "") => instance.delete("/api/orders/" + orderId),
};

api.product = {
  create: (data = {}) => instance.post("/api/products", data),
  getAll: (params = {}) => instance.get("/api/products", { params }),
  getById: (productId = "") => instance.get("/api/products/" + productId),
  updateById: (productId = "", data = {}) => instance.put("/api/products/" + productId, data),
  deleteById: (productId = "") => instance.delete("/api/products/" + productId),
};

api.mail = {
  sendOrder: (data = {}) => instance.post("/api/mails/send-order", data),
};

export const call = (api, apply = (data) => {}) =>
  api.then((res) => apply(res.data)).catch((err) => alert(err.response.data.message));

export default api;
