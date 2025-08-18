import axios from "axios";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.MODE === "development") {
      console.log(error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default baseApi;
