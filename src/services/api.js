import axios from "axios";

// Config environment variables
import { apiUrl } from "../config/config.example";

const api = axios.create({
  baseURL: apiUrl(),
});

export default api;
