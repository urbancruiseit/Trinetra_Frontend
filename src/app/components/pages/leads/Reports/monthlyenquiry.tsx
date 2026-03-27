"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyReport } from "../../../../features/reports/reportsSlice";
import { RootState } from "../../../../redux/store";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const getAdjustedDayIndex = (year: number, month: number, date: number) => {
  const day = new Date(year, month, date).getDay();
  return day === 0 ? 7 : day;
};

const getMonthsData = (year: number) => {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return monthNames.map((name, index) => ({
    name,
    days: getDaysInMonth(year, index),
    firstDay: getFirstDayOfMonth(year, index), 
  }));
};

const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getMonthColorClass(monthName: string): string {
  if (["JAN", "FEB", "MAR"].includes(monthName)) {
    return "bg-blue-50"; 
  } else if (["APR", "MAY", "JUN"].includes(monthName)) {
    return "bg-emerald-50";
  } else if (["JUL", "AUG", "SEP"].includes(monthName)) {
    return "bg-indigo-50"; 
  } else if (["OCT", "NOV", "DEC"].includes(monthName)) {
    return "bg-teal-50";
  }
  return "";
}

const getDayColorClass = (percentage: number) => {
  if (percentage >= 80) return "bg-emerald-600 text-white";
  if (percentage >= 60) return "bg-emerald-500 text-white";
  if (percentage >= 40) return "bg-amber-500 text-white";
  if (percentage >= 20) return "bg-orange-500 text-white";
  return "bg-rose-500 text-white";
};

export default function MonthlyEnquiryReport() {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: RootState) => state.report);

  const [year, setYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("JAN");

  useEffect(() => {
    dispatch(fetchMonthlyReport(Number(year)));
  }, [year, dispatch]);

  const reportData = useMemo(() => {
    const monthsData = getMonthsData(Number(year));

    if (!data || data.length === 0) {
      return monthsData.map((month) => ({
        ...month,
        dailyData: Array(month.days).fill(0),
        total: 0,
        avg: 0,
        dayPercentages: dayNames.map((day) => ({ name: day, percent: 0 })),
      }));
    }

    return monthsData.map((month, index) => {
      const monthNumber = index + 1;
      const dailyData = Array(month.days).fill(0);

      data.forEach((item: any) => {
        if (item.month === monthNumber && item.day <= month.days) {
          dailyData[item.day - 1] = item.total;
        }
      });

      const total = dailyData.reduce((a, b) => a + b, 0);
      const avg = Math.round(total / month.days);

      const dayTotals = Array(7).fill(0); 

      dailyData.forEach((value, dateIndex) => {
        if (value > 0) {
          const date = dateIndex + 1;
          const dayIndex = getAdjustedDayIndex(Number(year), index, date) - 1; 
          dayTotals[dayIndex] += value;
        }
      });

      const dayPercentages = dayNames.map((dayName, dayIndex) => {
        const dayTotal = dayTotals[dayIndex];
        const percent = total > 0 ? Math.round((dayTotal / total) * 100) : 0;
        return { name: dayName, percent };
      });

      return {
        ...month,
        dailyData,
        total,
        avg,
        dayPercentages,
      };
    });
  }, [data, year]);

  const grandTotal = reportData.reduce((acc, m) => acc + m.total, 0);

  const selectedMonthData =
    reportData.find((m) => m.name === selectedMonth) || reportData[0];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-xl font-bold text-gray-700">
            Loading Report...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="sticky top-0 z-10 bg-orange-100 p-3 rounded-md mb-4 border border-orange-200 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="pl-4 border-l-8 border-orange-600 bg-white px-3 rounded-md shadow-sm">
            <h2 className="text-4xl font-bold text-left py-4 text-orange-700 p-2">
              📊 Monthly Enquiry Report – {year}
            </h2>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reportData.map((month) => (
                <option key={month.name} value={month.name}>
                  {month.name} ({month.days} days)
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="border-collapse w-full text-center font-bold">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="border border-gray-300 p-2">MONTH</th>
              {[...Array(31)].map((_, i) => (
                <th key={i} className="border border-gray-300 p-1 text-xs">
                  {i + 1}
                </th>
              ))}
              <th className="border border-gray-300 p-2">TOTAL</th>
              <th className="border border-gray-300 p-2">AVG</th>
            </tr>
          </thead>

          <tbody>
            {reportData.map((month, idx) => {
              const monthColor = getMonthColorClass(month.name);

              return (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} 
                    `}
                >
                  <td
                    className={`border border-gray-300 p-2 font-bold ${monthColor}`}
                  >
                    {month.name}
                  </td>

                  {month.dailyData.map((value: number, i: number) => (
                    <td
                      key={i}
                      className={`border border-gray-300 p-1 ${monthColor} ${value > 0 ? "font-bold" : ""}`}
                    >
                      {value > 0 ? value : ""}
                    </td>
                  ))}

                  {[...Array(31 - month.days)].map((_, i) => (
                    <td
                      key={i}
                      className="border border-gray-300 p-1 bg-gray-100"
                    ></td>
                  ))}

                  <td className="border border-gray-300 p-2 bg-amber-200 font-bold text-gray-800">
                    {month.total}
                  </td>
                  <td className="border border-gray-300 p-2 bg-amber-200 font-bold text-gray-800">
                    {month.avg}
                  </td>
                </tr>
              );
            })}

            <tr className="bg-blue-950 text-white font-bold">
              <td className="border border-gray-300 p-2">TOTAL</td>

              {[...Array(31)].map((_, dateIndex) => {
                const dailyTotal = reportData.reduce((sum, month) => {
                  if (dateIndex < month.days) {
                    return sum + (month.dailyData[dateIndex] || 0);
                  }
                  return sum;
                }, 0);

                return (
                  <td key={dateIndex} className="border border-gray-300 p-2">
                    {dailyTotal > 0 ? dailyTotal : ""}
                  </td>
                );
              })}

              <td className="border border-gray-300 p-2">{grandTotal}</td>
              <td className="border border-gray-300 p-2"></td>
            </tr>

            <tr className="text-center font-bold w-full">
              <td
                colSpan={2}
                className="border border-gray-300 p-2 bg-gray-800 text-white"
              >
                DAY %
              </td>

              <td
                colSpan={5}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[0]?.percent || 0)}`}
              >
                MON {selectedMonthData?.dayPercentages?.[0]?.percent || 0}%
              </td>

              <td
                colSpan={5}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[1]?.percent || 0)}`}
              >
                TUE {selectedMonthData?.dayPercentages?.[1]?.percent || 0}%
              </td>

              <td
                colSpan={5}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[2]?.percent || 0)}`}
              >
                WED {selectedMonthData?.dayPercentages?.[2]?.percent || 0}%
              </td>

              <td
                colSpan={5}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[3]?.percent || 0)}`}
              >
                THU {selectedMonthData?.dayPercentages?.[3]?.percent || 0}%
              </td>

              <td
                colSpan={4}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[4]?.percent || 0)}`}
              >
                FRI {selectedMonthData?.dayPercentages?.[4]?.percent || 0}%
              </td>

              <td
                colSpan={4}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[5]?.percent || 0)}`}
              >
                SAT {selectedMonthData?.dayPercentages?.[5]?.percent || 0}%
              </td>

              <td
                colSpan={4}
                className={`border border-gray-300 p-2 font-bold ${getDayColorClass(selectedMonthData?.dayPercentages?.[6]?.percent || 0)}`}
              >
                SUN {selectedMonthData?.dayPercentages?.[6]?.percent || 0}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {data.length === 0 && !loading && (
        <div className="mt-4 p-4 bg-amber-50 rounded text-center w-full border border-amber-200">
          <p className="text-amber-800">
            No data found for year {year}.
            {year === "2026" &&
              " Please check if there are leads in the database for 2026."}
          </p>
        </div>
      )}
    </div>
  );
}
