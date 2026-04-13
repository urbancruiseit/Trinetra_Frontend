import axiosInstance from "@/uitils/axiosInstance";
import { baseApi } from "@/uitils/commonApi";

export interface AnnualReportData {
  daysData: number[][];
  sourceData: number[][];
  paxData: number[][];
  year: number;
}

interface ApiResponse {
  success: boolean;
  year: number;
  daysData: number[][];
  sourceData: number[][];
  paxData: number[][];
}

// ─── GET ANNUAL REPORT ─────────────────────
export const getAnnualReportApi = async (
  year: number,
): Promise<AnnualReportData> => {
  try {
    console.log("🌐 Fetching Annual Report:");
    console.log("🔍 URL:", `/annualreport/annual-report`);
    console.log("🔍 Year:", year);

    const { data: res, status } = await axiosInstance.get<ApiResponse>(
      "/annualreport/annual-report",
      {
        params: { year },
        timeout: 10000,
      },
    );

    console.log("✅ Response Status:", status);
    console.log("✅ Response Data:", res);

    if (res?.success) {
      return {
        daysData: res.daysData || [],
        sourceData: res.sourceData || [],
        paxData: res.paxData || [],
        year: res.year,
      };
    }

    return {
      daysData: [],
      sourceData: [],
      paxData: [],
      year,
    };
  } catch (error: any) {
    console.error("❌ Annual Report API Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      params: error.config?.params,
    });

    // ⏱️ Timeout
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - Server is taking too long");
    }

    // 🌐 Server down / network issue
    if (!error.response) {
      throw new Error(
        `Cannot connect to server at ${baseApi}. Please check if backend is running`,
      );
    }

    // ❌ 404 error
    if (error.response.status === 404) {
      throw new Error(
        `API endpoint not found: ${error.config?.url}. Please check backend routes`,
      );
    }

    throw new Error(
      error.response?.data?.message ||
        `Server error: ${error.response?.status}`,
    );
  }
};

// ─── TEST CONNECTION ───────────────────────
export const testAnnualReportConnection = async () => {
  try {
    const { data } = await axiosInstance.get("/annualreport/test");

    return {
      success: true,
      message: "Connected to annual report API",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      url: error.config?.url,
    };
  }
};
