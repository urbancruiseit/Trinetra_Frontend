import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApi } from "@/uitils/commonApi";

export type VehicleCode = {
  code: string;
  name: string;
};

type VehicleState = {
  vehicleCodes: VehicleCode[];
  loading: boolean;
  error: string | null;
};

const initialState: VehicleState = {
  vehicleCodes: [],
  loading: false,
  error: null,
};

export const fetchVehicles = createAsyncThunk<
  VehicleCode[],
  void,
  { rejectValue: string }
>("vehicle/fetchVehicles", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${baseApi}/vehicle`);
    return (res.data?.data ?? res.data ?? []) as VehicleCode[];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch vehicles");
  }
});

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleCodes = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch vehicles";
      });
  },
});

export default vehicleSlice.reducer;
