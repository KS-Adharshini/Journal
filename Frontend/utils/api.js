// Import axios for making HTTP requests
import axios from "axios";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:5000/api",  // Your backend URL, replace with your production URL in the future
  headers: {
    "Content-Type": "application/json", // Set content type as JSON
  },
});

// You can add custom methods if needed, for example:
export const registerUser = (userData) => {
  return api.post("/register", userData);  // POST request to /register
};

export const loginUser = (userData) => {
  return api.post("/login", userData);  // POST request to /login
};

// Default export the axios instance to use throughout your app
export default api;
