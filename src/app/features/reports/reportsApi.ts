import axiosInstance from "@/uitils/axiosInstance";
import { baseApi } from "@/uitils/commonApi";

export interface MonthlyReportRecord {
  month: number;
  day: number;
  total: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  year?: number;
}

// ─── GET MONTHLY REPORT ─────────────────────
export const getMonthlyReportApi = async (
  year: number,
): Promise<MonthlyReportRecord[]> => {
  try {
    console.log("🌐 URL:", `/reports/monthly-enquiry?year=${year}`);

    const { data: res, status } = await axiosInstance.get<
      ApiResponse<MonthlyReportRecord[]>
    >("/reports/monthly-enquiry", {
      params: { year },
      timeout: 10000,
    });

    console.log("✅ Response Status:", status);
    console.log("✅ Response Data:", res);

    if (res?.success && Array.isArray(res?.data)) {
      return res.data;
    }

    return [];
  } catch (error: any) {
    console.error("❌ API Error Details:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    });

    // ⏱️ Timeout
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - Server is taking too long");
    }

    // 🌐 No response (server down / network issue)
    if (!error.response) {
      throw new Error(
        `Cannot connect to server at ${baseApi}. ` +
          "Please check if backend is running",
      );
    }

    throw new Error(
      error.response?.data?.message ||
        `Server error: ${error.response?.status}`,
    );
  }
};

// ─── TEST CONNECTION ────────────────────────
export const testConnection = async () => {
  try {
    const { data } = await axiosInstance.get("/"); // baseURL hit karega

    return {
      success: true,
      message: "Connected to backend",
      data,
    };
  } catch (error) {
    return { success: false, error };
  }
};
