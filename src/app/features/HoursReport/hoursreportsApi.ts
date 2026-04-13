import axiosInstance from "@/uitils/axiosInstance";

export interface MonthlyHourReportRecord {
  month: number;
  day: number;
  hour: number;
  total: number;
}

// ─── GET MONTHLY HOUR REPORT ─────────────────
export const getMonthlyReportApi = async (
  year: number,
): Promise<MonthlyHourReportRecord[]> => {
  try {
    const { data: res } = await axiosInstance.get<{
      data: MonthlyHourReportRecord[];
    }>("/hoursreport", {
      params: { year },
    });

    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching monthly hour report:",
      error.response?.data || error.message,
    );

    throw error?.response?.data || error.message || "Something went wrong";
  }
};
