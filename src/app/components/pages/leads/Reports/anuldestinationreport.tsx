"use client";

import React from "react";

const months = [
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
  "JAN",
  "FEB",
  "MAR",
];

// Destination data from the image
const destinationData = [
  {
    name: "Tirthan",
    data: [0, 3, 9, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    total: 16,
    avg: 1,
    pct: "0%",
  },
  {
    name: "Balaji",
    data: [4, 3, 4, 2, 14, 4, 7, 5, 6, 3, 1, 0],
    total: 53,
    avg: 4,
    pct: "1%",
  },
  {
    name: "Himachal",
    data: [3, 3, 4, 3, 1, 1, 2, 2, 9, 3, 3, 1],
    total: 35,
    avg: 67,
    pct: "1%",
  },
  {
    name: "Lucknow",
    data: [3, 2, 3, 2, 2, 3, 10, 35, 9, 3, 10, 4],
    total: 86,
    avg: 7,
    pct: "2%",
  },
  {
    name: "Bir",
    data: [0, 4, 5, 3, 2, 0, 7, 0, 8, 3, 1, 1],
    total: 34,
    avg: 3,
    pct: "1%",
  },
  {
    name: "Chandigarh",
    data: [5, 2, 6, 2, 1, 2, 7, 15, 17, 3, 3, 3],
    total: 66,
    avg: 6,
    pct: "1%",
  },
  {
    name: "Rani Khet",
    data: [3, 3, 3, 0, 3, 3, 4, 5, 9, 4, 1, 0],
    total: 38,
    avg: 3,
    pct: "1%",
  },
  {
    name: "Dhanaulti",
    data: [2, 4, 2, 0, 4, 0, 2, 2, 4, 8, 1, 0],
    total: 29,
    avg: 2,
    pct: "1%",
  },
  {
    name: "Joshimath",
    data: [0, 5, 3, 0, 1, 1, 2, 0, 3, 5, 1, 0],
    total: 21,
    avg: 2,
    pct: "0%",
  },
  {
    name: "Omkareshwar",
    data: [2, 0, 4, 3, 9, 0, 6, 6, 10, 7, 1, 1],
    total: 49,
    avg: 4,
    pct: "1%",
  },
  {
    name: "Jodhpur",
    data: [2, 0, 1, 1, 0, 4, 2, 7, 18, 8, 8, 2],
    total: 53,
    avg: 4,
    pct: "1%",
  },
  {
    name: "Ajmer",
    data: [2, 0, 3, 3, 2, 1, 11, 12, 13, 5, 1, 1],
    total: 44,
    avg: 4,
    pct: "1%",
  },
  {
    name: "Mussorie",
    data: [2, 1, 1, 0, 0, 0, 0, 0, 5, 2, 1, 4],
    total: 16,
    avg: 1,
    pct: "0%",
  },
  {
    name: "Bareilly",
    data: [1, 0, 1, 1, 2, 0, 0, 0, 5, 2, 1, 4],
    total: 17,
    avg: 1,
    pct: "0%",
  },
  {
    name: "DharmShala",
    data: [0, 1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    total: 5,
    avg: 0,
    pct: "0%",
  },
  {
    name: "Ghaziabad",
    data: [1, 1, 1, 0, 2, 1, 2, 11, 5, 4, 2, 1],
    total: 31,
    avg: 3,
    pct: "1%",
  },
  {
    name: "Satpulishetra",
    data: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    total: 3,
    avg: 0,
    pct: "0%",
  },
  {
    name: "Triyuginarayan",
    data: [1, 1, 1, 0, 0, 2, 0, 12, 3, 0, 3, 0],
    total: 23,
    avg: 45,
    pct: "0%",
  },
];

// Monthly totals from the image
const monthlyTotals = [
  280, 596, 665, 195, 345, 313, 522, 555, 896, 508, 180, 63,
];
const grandTotal = 5118;
const grandAvg = 534;
const grandPct = "100%";

export default function DestinationAnalysisTable() {
  return (
    <div className="w-full overflow-auto">
      {/* HEADER */}

      <div className="sticky top-0 z-10 bg-orange-100 p-3 rounded-md">
        <div className="flex justify-between items-center">
          <div className="pl-4 border-l-8 border-orange-500 bg-white px-3 rounded-md shadow-md">
            <h2 className="text-4xl font-bold text-left py-4 text-orange-600">
              📊 ANALYSIS - DESTINATION
            </h2>
          </div>
        </div>
      </div>

      <div className=" mt-2 bg-white border border-gray-300 rounded-lg overflow-x-auto">
        <table className="border-collapse text-sm  w-full">
          <thead>
            {/* Main Header Row */}
            <tr>
              <th
                colSpan={2}
                rowSpan={2}
                className="border p-2 bg-gradient-to-b from-gray-700 to-gray-800 text-white text-center"
              >
                # / DESTINATION
              </th>
            </tr>

            {/* Sub Header Row */}
            <tr>
              {/* Month columns - all 12 months */}
              {months.map((_, i) => (
                <th
                  key={i}
                  className="border p-1 bg-blue-950 text-white font-semibold "
                >
                  {months[i]}
                </th>
              ))}
              {/* Summary columns */}
              <th className="border  bg-yellow-950 text-white font-bold text-center">
                TOTAL
              </th>
              <th className="border  bg-yellow-950 text-white font-bold text-center">
                AVG
              </th>
              <th className="border  bg-yellow-950 text-white font-bold text-lg text-center">
                %
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Destination Rows */}
            {destinationData.map((dest, index) => {
              const serialNo = 1 + index;
              return (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors border-b"
                >
                  <td className="border p-2 font-semibold bg-gray-100 text-center w-12">
                    {serialNo}
                  </td>
                  <td className="border p-1 font-bold text-md text-emerald-700 bg-emerald-50">
                    {dest.name}
                  </td>

                  {/* Monthly data */}
                  {dest.data.map((value, i) => (
                    <td
                      key={i}
                      className={`border text-center text-lg ${
                        value > 0 ? "font-extrabold" : "text-gray-400"
                      }`}
                    >
                      {value}
                    </td>
                  ))}

                  {/* Summary data */}
                  <td className="border p-2 text-right font-extrabold text-lg  bg-yellow-500">
                    {dest.total}
                  </td>
                  <td className="border p-2 text-right font-extrabold text-lg bg-yellow-500">
                    {dest.avg}
                  </td>
                  <td className="border p-2 text-center font-extrabold text-lg text-purple-700 bg-yellow-500">
                    {dest.pct}
                  </td>
                </tr>
              );
            })}

            {/* TOTAL Row */}
            <tr className="bg-gradient-to-r from-green-700 to-emerald-700 font-extrabold text-white">
              <td colSpan={2} className="border p-2 text-center text-lg">
                TOTAL
              </td>

              {/* Monthly totals */}
              {monthlyTotals.map((total, i) => (
                <td
                  key={i}
                  className="border p-2 text-right font-extrabold text-xl"
                >
                  {total}
                </td>
              ))}

              {/* Summary totals */}
              <td className="border p-2 text-right font-bold text-lg">
                {grandTotal}
              </td>
              <td className="border p-2 text-right font-bold">{grandAvg}</td>
              <td className="border p-2 text-center font-bold bg-purple-800">
                {grandPct}
              </td>
            </tr>
          </tbody>

          {/* Summary Footer */}
          <tfoot>
            <tr>
              <td colSpan={17} className="border p-3 bg-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-700">
                    📊 Total Destinations: {destinationData.length}
                  </span>
                  <span className="font-bold text-lg text-gray-700">
                    Total Enquiries:{" "}
                    <span className="font-bold text-blue-800">
                      {grandTotal}
                    </span>
                  </span>
                  <span className="bg-purple-200 px-4 py-1.5 rounded-full text-purple-900 font-bold text-lg">
                    Monthly Average: {grandAvg}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Additional Info */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <span className="text-md text-gray-600">Top Destination:</span>
              <span className="ml-2 font-bold text-emerald-700">
                Lucknow (86)
              </span>
            </div>
            <div className="text-center">
              <span className="text-md text-gray-600">Peak Month:</span>
              <span className="ml-2 font-bold text-blue-700">DEC (896)</span>
            </div>
            <div className="text-center">
              <span className="text-md text-gray-600">Lowest Month:</span>
              <span className="ml-2 font-bold text-gray-700">MAR (63)</span>
            </div>
            <div className="text-center">
              <span className="text-md text-gray-600">Contribution:</span>
              <span className="ml-2 font-bold text-purple-700">Dec: 17.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
