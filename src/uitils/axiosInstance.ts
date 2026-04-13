import axios from "axios";

export const baseApi =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1/";

const axiosInstance = axios.create({
  baseURL: baseApi,
  withCredentials: true, // Sirf cookies bhejo
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
