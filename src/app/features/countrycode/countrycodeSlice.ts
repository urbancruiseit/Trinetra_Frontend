import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApi } from "@/uitils/commonApi";

export type Country = {
  id: number | string;
  country_code: string;
  phone_code: string;
  country_name: string;
};

type CountryState = {
  countries: Country[];
  loading: boolean;
  error: string | null;
};

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const getCountriesThunk = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>("country/getCountries", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${baseApi}/country`);
    return (res.data?.data ?? res.data ?? []) as Country[];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch countries");
  }
});

const countrycodeSlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(getCountriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch countries";
      });
  },
});

export default countrycodeSlice.reducer;
