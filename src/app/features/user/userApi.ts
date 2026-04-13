import axiosInstance from "@/uitils/axiosInstance";
import type { User } from "@/types/types";

interface LoginData {
  email: string;
  password: string;
}

// ─── LOGIN USER ─────────────────────────────
export const loginUser = async (data: LoginData): Promise<User> => {
  try {
    const { data: res } = await axiosInstance.post<User>("/user/login", data);
    return res;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ─── CURRENT USER ───────────────────────────
export const currentUser = async (): Promise<User> => {
  try {
    const { data: res } = await axiosInstance.get<User>("/user/current-user");

    console.log("Current user response:", res);

    return res.data;
  } catch (error: any) {
    console.error("Current user error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Unauthorized");
  }
};

// ─── CREATE USER ────────────────────────────
export const createUser = async (formData: Partial<User>): Promise<User> => {
  try {
    console.log("create user", formData);

    const { data: res } = await axiosInstance.post<User>("/user", formData);

    return res;
  } catch (error: any) {
    console.error("Create User Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "User creation failed");
  }
};
