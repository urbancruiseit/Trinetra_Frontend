import axiosInstance from "@/uitils/axiosInstance";
import { travelcity } from "@/types/types";

// ─── GET ALL CITIES ─────────────────────────
export const getAllCitiesApi = async (): Promise<travelcity[]> => {
  try {
    const { data: res } = await axiosInstance.get("/travelcity");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching cities:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};

// ─── GET CITY BY ID ─────────────────────────
export const getCityByIdApi = async (
  id: number | string,
): Promise<travelcity> => {
  try {
    const { data: res } = await axiosInstance.get(`/travelcity/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching city:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};

// ─── GET CITY NAMES ─────────────────────────
export const getCityNamesApi = async (): Promise<
  Pick<travelcity, "id" | "uuid" | "cityName">[]
> => {
  try {
    const { data: res } = await axiosInstance.get("/travelcity/names");
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching city names:",
      error.response?.data || error.message,
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch city names",
    );
  }
};
