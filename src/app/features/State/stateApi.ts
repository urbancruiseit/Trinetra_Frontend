import axiosInstance from "@/uitils/axiosInstance";

export interface City {
  id: number;
  cityName: string;
}

export interface State {
  id: number;
  stateName: string;
}

// ─── GET ALL STATES ─────────────────────────
export const getAllStatesApi = async (): Promise<State[]> => {
  const { data: res } = await axiosInstance.get("/state/");
  return res.data;
};

// ─── GET ALL CITIES ─────────────────────────
export const getAllCitiesApi = async (): Promise<City[]> => {
  const { data: res } = await axiosInstance.get("/state/allcity");
  return res.data;
};

// ─── GET STATES BY CITY ─────────────────────
export const getStatesByCityApi = async (
  cityName: string,
): Promise<State[]> => {
  const { data: res } = await axiosInstance.get(
    `/state/states-by-city/${encodeURIComponent(cityName)}`,
  );
  return res.data;
};
