import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const responseBody = (response) => response.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body, config).then(responseBody),
  put: (url, body) => axios.put(url, body, config).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Users = {
  user: () => request.get("/users/me"),
  login: (body) => request.post("/auth/local", body, config),
  register: (body) => request.post("/users", body, config),
};

const Products = {
  list: () => request.get("/products"),
  product: (id) => request.get(`/products/${id}`),
  add: (body) => request.post(`/products`, body, config),
  edit: (id, body) => request.put(`/products/${id}`, body, config),
  remove: (id) => request.del(`/products/user/${id}`),
};

const agent = { Users, Products };

export default agent;
