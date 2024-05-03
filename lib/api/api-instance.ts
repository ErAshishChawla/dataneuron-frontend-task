import axios from "axios";

// Create an axios instance to use for all client API requests
export const api = axios.create({
  baseURL:
    process.env.SERVER_URL! ||
    "https://dataneuron-backend-task.onrender.com/api",
});
