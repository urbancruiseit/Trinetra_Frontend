import axiosInstance from "@/uitils/axiosInstance";
import type { LeadRecord } from "@/types/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ─── CREATE LEAD ───────────────────────────
export const createLeadApi = async (
  leadData: Partial<LeadRecord>,
): Promise<LeadRecord> => {
  try {
    console.log("API leadData:", leadData);

    const { data: res } = await axiosInstance.post<ApiResponse<LeadRecord>>(
      "/lead",
      leadData,
    );

    return res.data;
  } catch (error: any) {
    console.error("Create Lead Error:", error.response?.data || error.message);

    const apiError = error.response?.data;

    const errorMessage =
      apiError?.error ||
      apiError?.message ||
      apiError?.details ||
      error.message ||
      "Failed to create lead";

    throw new Error(errorMessage);
  }
};

// ─── GET LEADS (PAGINATED) ─────────────────
export interface PaginatedLeadsResponse {
  leads: LeadRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getLeadApi = async (
  page: number = 1,
): Promise<PaginatedLeadsResponse> => {
  try {
    const { data: res } = await axiosInstance.get<
      ApiResponse<PaginatedLeadsResponse>
    >("/lead", { params: { page } });

    return {
      leads: res.data.leads || [],
      total: res.data.total || 0,
      page: res.data.page || page,
      limit: res.data.limit || 15,
      totalPages: Math.ceil((res.data.total || 0) / (res.data.limit || 15)),
    };
  } catch (error: any) {
    console.error("Get Leads Error:", error.response?.data || error.message);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch leads";

    throw new Error(errorMessage);
  }
};

// ─── UPDATE LEAD ───────────────────────────
export const updateLeadApi = async (
  id: string,
  leadData: Partial<LeadRecord>,
): Promise<LeadRecord> => {
  try {
    console.log("API update leadData:", id, leadData);

    const { data: res } = await axiosInstance.put<ApiResponse<LeadRecord>>(
      `/lead/${id}`,
      leadData,
    );

    return res.data;
  } catch (error: any) {
    console.error("Update Lead Error:", error.response?.data || error.message);

    throw new Error(
      error.response?.data?.message || error.message || "Failed to update lead",
    );
  }
};

// ─── MARK UNWANTED ─────────────────────────
export const markUnwantedApi = async (
  id: number,
  data: {
    unwanted_status: "unwanted" | "wanted";
    reason?: string;
  },
) => {
  try {
    console.log("🚀 Marking unwanted:", id, data);

    const { data: res } = await axiosInstance.patch(
      `/lead/unwanted/${id}`,
      data,
    );

    console.log("✅ Success:", res);
    return res.data;
  } catch (error: any) {
    console.error("❌ API Error:", error.response?.data || error.message);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to mark unwanted";

    throw new Error(errorMessage);
  }
};

// ─── GET ALL UNWANTED LEADS ────────────────
export const getAllUnwantedLeadsApi = async (): Promise<LeadRecord[]> => {
  try {
    const { data: res } =
      await axiosInstance.get<ApiResponse<LeadRecord[]>>("/lead/unwanted/all");

    return res.data;
  } catch (error: any) {
    console.error(
      "Get All Unwanted Leads Error:",
      error.response?.data || error.message,
    );

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch unwanted leads";

    throw new Error(errorMessage);
  }
};
