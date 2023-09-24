import axios from "axios";

// Create a custom axios instance
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  config.headers["app_id"] = process.env.API_ID;
  config.headers["app_key"] = process.env.API_KEY;
  config.headers["ResourceVersion"] = process.env.API_VERSION;
  config.headers["Accept"] = "application/json";
  return config;
});

export default api;
