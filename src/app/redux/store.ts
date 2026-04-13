import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import leadReducer from "../features/lead/leadSlice";
import travelcityReducer from "../features/travelcity/travelcitySlice";
import customerReducer from "../features/Customer/customerSlice";
import stateCityReducer from "../features/State/stateSlice";

import reportReducer from "../features/reports/reportsSlice";
import annualReportReducer from "../features/AnnualReport/annualreportSlice";
import HoursReportReducer from "../features/HoursReport/hoursreportsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lead: leadReducer,
    travelcity: travelcityReducer,
    customer: customerReducer,
    stateCity: stateCityReducer,
    report: reportReducer,
    annualReport: annualReportReducer,
    hoursReport: HoursReportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
