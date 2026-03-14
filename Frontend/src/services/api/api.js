import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      return Promise.reject({ message: "Request timeout" });
    }

    if (error.response) {
      // Server responded with error status
      console.error(
        `❌ Error ${error.response.status} from ${error.config?.url}:`,
        error.response.data,
      );

      if (error.response.status === 401) {
        console.log("Unauthorized access");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("unauthorized"));
        }
      }
    } else if (error.request) {
      // Request was made but no response
      console.error("No response from server:", error.request);
      error.response = { data: { message: "Cannot connect to server" } };
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  checkAuth: () => api.get("/auth/check"),
};

// User API calls
export const userAPI = {
  getProfile: (username) => api.get(`/users/${username}`),
  updateProfile: (data) => api.put("/users/profile", data),
  followUser: (userId) => api.put(`/users/${userId}/follow`),
  searchUsers: (query) => api.get(`/users/search?q=${query}`),
};

// Posts API calls
export const postAPI = {
  getFeed: () => api.get("/posts/feed"),
  getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
  createPost: (formData) =>
    api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  likePost: (postId) => api.put(`/posts/${postId}/like`),
  addComment: (postId, text) => api.post(`/posts/${postId}/comment`, { text }),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
};

export default api;
