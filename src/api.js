import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5257/api", // match API with backend
});

export default api;
