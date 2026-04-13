"use client";

import { useState, useMemo } from "react";

// Month configuration
const monthsData = [
  { name: "APR", days: 30, baseTotal: 221, baseAvg: 7 },
  { name: "MAY", days: 31, baseTotal: 223, baseAvg: 7 },
  { name: "JUN", days: 30, baseTotal: 238, baseAvg: 8 },
  { name: "JUL", days: 31, baseTotal: 171, baseAvg: 6 },
  { name: "AUG", days: 31, baseTotal: 136, baseAvg: 4 },
  { name: "SEP", days: 30, baseTotal: 134, baseAvg: 4 },
  { name: "OCT", days: 31, baseTotal: 117, baseAvg: 4 },
  { name: "NOV", days: 30, baseTotal: 60, baseAvg: 2 },
  { name: "DEC", days: 31, baseTotal: 26, baseAvg: 1 },
  { name: "JAN", days: 31, baseTotal: 264, baseAvg: 9 },
  { name: "FEB", days: 28, baseTotal: 232, baseAvg: 8 },
  { name: "MAR", days: 31, baseTotal: 231, baseAvg: 7 },
];

const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function generateDailyData(monthInfo: { days: number; baseTotal: number }) {
  const { days, baseTotal } = monthInfo;
  const dailyData: number[] = [];
  let remaining = baseTotal;

  for (let i = 0; i < days; i++) {
    const daysLeft = days - i;
    const avg = Math.floor(remaining / daysLeft);
    const value =
      i === days - 1
        ? remaining
        : Math.min(
            remaining,
            Math.max(0, avg + Math.floor(Math.random() * 5 - 2)),
          );

    dailyData.push(value);
    remaining -= value;
  }
  return dailyData;
}

// 🎨 Color mapping function based on month
const getMonthColor = (monthName: string) => {
  // Rose / Cherry Light Red for APR, MAY, JUN
  if (["APR", "MAY", "JUN"].includes(monthName)) {
    return "bg-rose-50 hover:bg-rose-300";
  }

  // Cyan for JUL, AUG, SEP
  if (["JUL", "AUG", "SEP"].includes(monthName)) {
    return "bg-cyan-50 hover:bg-cyan-300";
  }

  // Purple Light for OCT, NOV, DEC
  if (["OCT", "NOV", "DEC"].includes(monthName)) {
    return "bg-purple-50 hover:bg-purple-200";
  }

  // Rose / Cherry Light Red for JAN, FEB, MAR
  if (["JAN", "FEB", "MAR"].includes(monthName)) {
    return "bg-rose-50 hover:bg-rose-200";
  }

  return "bg-gray-200"; // Default fallback
};

export default function MonthlyEnquiryReport() {
  const [year, setYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState(monthsData[0].name);

  const allMonthsData = useMemo(() => {
    return monthsData.map((month) => {
      const dailyData = generateDailyData(month);
      const total = dailyData.reduce((a, b) => a + b, 0);
      const avg = Math.round(total / month.days);
      return { ...month, dailyData, total, avg };
    });
  }, []);

  const dailyTotals = useMemo(() => {
    const totals: number[] = [];
    for (let i = 0; i < 31; i++) {
      let sum = 0;
      allMonthsData.forEach((m) => {
        if (i < m.days) sum += m.dailyData[i];
      });
      totals.push(sum);
    }
    return totals;
  }, [allMonthsData]);

  const grandTotal = allMonthsData.reduce((a, b) => a + b.total, 0);
  const grandAvg = Math.round(grandTotal / allMonthsData.length);

  return (
    <div className="">
      <div className="mb-4 bg-orange-100 shadow-lg rounded-md flex justify-between items-center">
        <div className="sticky top-0 z-10 bg-orange-100 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <div className="pl-4 border-l-8 border-orange-500 bg-white px-3 rounded-md shadow-md">
              <h2 className="text-4xl font-bold text-left py-4 text-orange-600 p-2">
                Long Weekend Report - {selectedMonth} {year}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-500 rounded-lg">
        <table className="border-collapse font-bold w-full">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="border p-2">#</th>
              <th className="border p-2">MONTH</th>
              {[...Array(31)].map((_, i) => (
                <th key={i} className="border border-white p-1">
                  {i + 1}
                </th>
              ))}
              <th className="border p-2 bg-blue-950 text-white">TOTAL</th>
              <th className="border p-2 bg-blue-950 text-white">AVG</th>
            </tr>
          </thead>

          <tbody>
            {allMonthsData.map((m, idx) => {
              // 🎨 Get color based on month
              const rowBg = getMonthColor(m.name);
              const totalBg = "bg-amber-200 border border-white"; // Yellow for total column

              return (
                <tr
                  key={idx}
                  className={`text-center transition-colors duration-200`}
                >
                  <td className={`border p-2 ${rowBg}`}>{idx + 1}</td>
                  <td className={`border p-2 ${rowBg} font-bold`}>{m.name}</td>

                  {/* Daily data cells */}
                  {m.dailyData.map((v, i) => (
                    <td key={i} className={`border p-1 ${rowBg}`}>
                      {v || ""}
                    </td>
                  ))}

                  {/* Empty cells for days beyond month length */}
                  {[...Array(31 - m.days)].map((_, i) => (
                    <td key={i} className={`border p-1 ${rowBg}`}></td>
                  ))}

                  {/* Total and Average columns */}
                  <td className={`border p-2 font-extrabold ${totalBg}`}>
                    {m.total}
                  </td>
                  <td className={`border p-2 font-extrabold ${totalBg}`}>
                    {m.avg}
                  </td>
                </tr>
              );
            })}

            {/* Grand Total Row */}
            <tr className="bg-blue-950 text-white text-center">
              <td colSpan={2} className="border border-white p-2 font-bold">
                TOTAL
              </td>
              {dailyTotals.map((v, i) => (
                <td key={i} className="border p-2 font-bold">
                  {v}
                </td>
              ))}
              <td className="border p-2 font-bold">{grandTotal}</td>
              <td className="border p-2 font-bold">{grandAvg}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Color Legend */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Color Legend:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-rose-50 rounded border"></div>
            <span>APR, MAY, JUN, JAN, FEB, MAR (Rose/Cherry Light Red)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-50 rounded border"></div>
            <span>JUL, AUG, SEP (Cyan)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-50 rounded border"></div>
            <span>OCT, NOV, DEC (Purple Light)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-200 rounded border"></div>
            <span>Total & Average Columns (Yellow)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
