"use client";

import React from "react";

// Data from the image
const billingData = [
  {
    mth: "APR",
    contract: 0,
    corp: 29,
    total: 347,
    total2: 376,
    contractPct: "0%",
    corpPct: "8%",
    persumaPct: "92%",
    wedding: 46,
    vacation: 227,
    pilgrim: 67,
    events: 19,
    local: 15,
    total3: 374,
    weddingPct: "12%",
    vacationPct: "61%",
    pilgrimPct: "18%",
    eventsPct: "5%",
    localPct: "4%",
  },
  {
    mth: "MAY",
    contract: 1,
    corp: 31,
    total: 577,
    total2: 609,
    contractPct: "0%",
    corpPct: "5%",
    persumaPct: "95%",
    wedding: 34,
    vacation: 402,
    pilgrim: 132,
    events: 21,
    local: 19,
    total3: 608,
    weddingPct: "6%",
    vacationPct: "66%",
    pilgrimPct: "22%",
    eventsPct: "3%",
    localPct: "3%",
  },
  {
    mth: "JUN",
    contract: 0,
    corp: 13,
    total: 801,
    total2: 814,
    contractPct: "0%",
    corpPct: "2%",
    persumaPct: "98%",
    wedding: 13,
    vacation: 658,
    pilgrim: 123,
    events: 12,
    local: 8,
    total3: 814,
    weddingPct: "2%",
    vacationPct: "81%",
    pilgrimPct: "15%",
    eventsPct: "1%",
    localPct: "1%",
  },
  {
    mth: "JUL",
    contract: 0,
    corp: 22,
    total: 297,
    total2: 319,
    contractPct: "0%",
    corpPct: "7%",
    persumaPct: "93%",
    wedding: 5,
    vacation: 273,
    pilgrim: 21,
    events: 13,
    local: 7,
    total3: 319,
    weddingPct: "2%",
    vacationPct: "86%",
    pilgrimPct: "7%",
    eventsPct: "4%",
    localPct: "2%",
  },
  {
    mth: "AUG",
    contract: 2,
    corp: 56,
    total: 457,
    total2: 515,
    contractPct: "0%",
    corpPct: "12%",
    persumaPct: "89%",
    wedding: 9,
    vacation: 400,
    pilgrim: 69,
    events: 17,
    local: 20,
    total3: 515,
    weddingPct: "2%",
    vacationPct: "78%",
    pilgrimPct: "13%",
    eventsPct: "3%",
    localPct: "4%",
  },
  {
    mth: "SEP",
    contract: 0,
    corp: 64,
    total: 363,
    total2: 427,
    contractPct: "0%",
    corpPct: "18%",
    persumaPct: "85%",
    wedding: 12,
    vacation: 333,
    pilgrim: 50,
    events: 10,
    local: 22,
    total3: 427,
    weddingPct: "3%",
    vacationPct: "78%",
    pilgrimPct: "12%",
    eventsPct: "2%",
    localPct: "5%",
  },
  {
    mth: "OCT",
    contract: 4,
    corp: 59,
    total: 678,
    total2: 741,
    contractPct: "1%",
    corpPct: "9%",
    persumaPct: "91%",
    wedding: 60,
    vacation: 575,
    pilgrim: 59,
    events: 23,
    local: 25,
    total3: 742,
    weddingPct: "8%",
    vacationPct: "77%",
    pilgrimPct: "8%",
    eventsPct: "3%",
    localPct: "3%",
  },
  {
    mth: "NOV",
    contract: 0,
    corp: 94,
    total: 1108,
    total2: 1202,
    contractPct: "0%",
    corpPct: "8%",
    persumaPct: "92%",
    wedding: 416,
    vacation: 707,
    pilgrim: 38,
    events: 28,
    local: 13,
    total3: 1202,
    weddingPct: "35%",
    vacationPct: "59%",
    pilgrimPct: "3%",
    eventsPct: "2%",
    localPct: "1%",
  },
  {
    mth: "DEC",
    contract: 1,
    corp: 96,
    total: 1191,
    total2: 1288,
    contractPct: "0%",
    corpPct: "8%",
    persumaPct: "92%",
    wedding: 132,
    vacation: 1094,
    pilgrim: 41,
    events: 13,
    local: 8,
    total3: 1288,
    weddingPct: "10%",
    vacationPct: "85%",
    pilgrimPct: "3%",
    eventsPct: "1%",
    localPct: "1%",
  },
  {
    mth: "JAN",
    contract: 2,
    corp: 63,
    total: 666,
    total2: 731,
    contractPct: "0%",
    corpPct: "9%",
    persumaPct: "91%",
    wedding: 38,
    vacation: 633,
    pilgrim: 41,
    events: 5,
    local: 14,
    total3: 731,
    weddingPct: "5%",
    vacationPct: "87%",
    pilgrimPct: "6%",
    eventsPct: "1%",
    localPct: "2%",
  },
  {
    mth: "FEB",
    contract: 0,
    corp: 7,
    total: 370,
    total2: 377,
    contractPct: "0%",
    corpPct: "2%",
    persumaPct: "98%",
    wedding: 178,
    vacation: 185,
    pilgrim: 11,
    events: 0,
    local: 3,
    total3: 377,
    weddingPct: "47%",
    vacationPct: "49%",
    pilgrimPct: "3%",
    eventsPct: "0%",
    localPct: "1%",
  },
  {
    mth: "MAR",
    contract: 1,
    corp: 4,
    total: 87,
    total2: 92,
    contractPct: "1%",
    corpPct: "5%",
    persumaPct: "95%",
    wedding: 41,
    vacation: 46,
    pilgrim: 4,
    events: 0,
    local: 1,
    total3: 92,
    weddingPct: "0%",
    vacationPct: "1%",
    pilgrimPct: "0%",
    eventsPct: "0%",
    localPct: "0%",
  },
];

// Totals row from image
const totals = {
  serial: "",
  mth: "TOTAL",
  contract: 11,
  corp: 538,
  total: 6942,
  total2: 7491,
  contractPct: "0%",
  corpPct: "7%",
  persumaPct: "93%",
  wedding: 984,
  vacation: 5533,
  pilgrim: 656,
  events: 161,
  local: 155,
  total3: 7489,
  weddingPct: "13%",
  vacationPct: "74%",
  pilgrimPct: "9%",
  eventsPct: "2%",
  localPct: "2%",
};

// Averages row from image
const averages = {
  serial: "",
  mth: "AVG",
  contract: 1,
  corp: 45,
  total: 579,
  total2: 624,
  contractPct: "",
  corpPct: "",
  persumaPct: "",
  wedding: 82,
  vacation: 461,
  pilgrim: 55,
  events: 13,
  local: 13,
  total3: 624,
  weddingPct: "",
  vacationPct: "",
  pilgrimPct: "",
  eventsPct: "",
  localPct: "",
};

export default function BillingAnalysisTable() {
  return (
    <div className="w-full">
      {/* HEADER */}

      <div className="sticky top-0 z-10 bg-orange-100 p-3 rounded-md">
        <div className="flex justify-between items-center">
          <div className="pl-4 border-l-8 border-orange-500 bg-white px-3 rounded-md shadow-md">
            <h2 className="text-4xl font-bold text-left py-4 text-orange-600">
              📊 ANALYSIS - BILLING TYPE{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="p-2 mt-2 bg-white border border-gray-300 rounded-lg overflow-x-auto">
        <table className="border-collapse text-sm min-w-[1400px] w-full">
          <thead>
            {/* Main Header Row - Three Sections */}
            <tr className="text-white">
              <th
                colSpan={2}
                rowSpan={2}
                className="border p-3 bg-gray-800 text-center"
              >
                # / MTH
              </th>
              <th
                colSpan={7}
                className="border p-3 bg-cyan-700 text-center text-base"
              >
                BILLING TYPE
              </th>
              <th
                colSpan={6}
                className="border p-3 bg-green-700 text-center text-base"
              >
                DETAIL BREAKDOWN (COUNT)
              </th>
              <th
                colSpan={6}
                className="border p-3 bg-pink-700 text-center text-base"
              >
                DETAIL BREAKDOWN (%)
              </th>
            </tr>

            {/* Sub Header Row - Exact Column Headers */}
            <tr>
              {/* BILLING TYPE Headers */}
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                CONTRACT
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                CORP
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                TOTAL
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                TOTAL
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                CONTRACT%
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                CORP%
              </th>
              <th className="border p-2 bg-blue-100 text-blue-900 font-bold">
                PERSUMA%
              </th>

              {/* DETAIL BREAKDOWN (COUNT) Headers */}
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                TOTAL
              </th>
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                WEDDING
              </th>
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                VACATION
              </th>
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                PILGRIM
              </th>
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                EVENTS
              </th>
              <th className="border p-2 bg-green-100 text-green-900 font-bold">
                LOCAL
              </th>

              {/* DETAIL BREAKDOWN (%) Headers */}
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                TOTAL
              </th>
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                WEDDING%
              </th>
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                VACATION%
              </th>
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                PILGRIM%
              </th>
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                EVENTS%
              </th>
              <th className="border p-2 bg-pink-100 text-pink-900 font-bold">
                LOCAL%
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Data Rows */}
            {billingData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="border p-2 font-bold bg-gray-100 text-center w-12">
                  {index + 1}
                </td>
                <td className="border p-2 font-bold text-indigo-700 text-center w-16">
                  {row.mth}
                </td>

                {/* BILLING TYPE Data */}
                <td className="border p-2 text-right font-mono">
                  {row.contract}
                </td>
                <td className="border p-2 text-right font-mono">{row.corp}</td>
                <td className="border p-2 text-right font-mono bg-yellow-50">
                  {row.total}
                </td>
                <td className="border p-2 text-right font-mono bg-yellow-50">
                  {row.total2}
                </td>
                <td className="border p-2 text-center font-semibold">
                  {row.contractPct}
                </td>
                <td className="border p-2 text-center font-semibold">
                  {row.corpPct}
                </td>
                <td className="border p-2 text-center font-bold text-purple-700 bg-purple-50">
                  {row.persumaPct}
                </td>

                {/* DETAIL BREAKDOWN (COUNT) Data */}
                <td className="border p-2 text-right font-mono bg-green-50 font-bold">
                  {row.total3}
                </td>
                <td className="border p-2 text-right font-mono">
                  {row.wedding}
                </td>
                <td className="border p-2 text-right font-mono">
                  {row.vacation}
                </td>
                <td className="border p-2 text-right font-mono">
                  {row.pilgrim}
                </td>
                <td className="border p-2 text-right font-mono">
                  {row.events}
                </td>
                <td className="border p-2 text-right font-mono">{row.local}</td>

                {/* DETAIL BREAKDOWN (%) Data */}
                <td className="border p-2 text-right font-mono bg-pink-50 font-bold">
                  {row.total3}
                </td>
                <td className="border p-2 text-center font-medium text-pink-700">
                  {row.weddingPct}
                </td>
                <td className="border p-2 text-center font-medium text-pink-700">
                  {row.vacationPct}
                </td>
                <td className="border p-2 text-center font-medium text-pink-700">
                  {row.pilgrimPct}
                </td>
                <td className="border p-2 text-center font-medium text-pink-700">
                  {row.eventsPct}
                </td>
                <td className="border p-2 text-center font-medium text-pink-700">
                  {row.localPct}
                </td>
              </tr>
            ))}

            {/* TOTAL Row */}
            <tr className="bg-gradient-to-r from-green-800 to-green-900 font-bold text-white">
              <td colSpan={2} className="border p-2 text-center">
                TOTAL
              </td>
              <td className="border p-2 text-right">{totals.contract}</td>
              <td className="border p-2 text-right">{totals.corp}</td>
              <td className="border p-2 text-right">{totals.total}</td>
              <td className="border p-2 text-right">{totals.total2}</td>
              <td className="border p-2 text-center">{totals.contractPct}</td>
              <td className="border p-2 text-center">{totals.corpPct}</td>
              <td className="border p-2 text-center bg-purple-800">
                {totals.persumaPct}
              </td>
              <td className="border p-2 text-right">{totals.total3}</td>
              <td className="border p-2 text-right">{totals.wedding}</td>
              <td className="border p-2 text-right">{totals.vacation}</td>
              <td className="border p-2 text-right">{totals.pilgrim}</td>
              <td className="border p-2 text-right">{totals.events}</td>
              <td className="border p-2 text-right">{totals.local}</td>
              <td className="border p-2 text-right">{totals.total3}</td>
              <td className="border p-2 text-center">{totals.weddingPct}</td>
              <td className="border p-2 text-center">{totals.vacationPct}</td>
              <td className="border p-2 text-center">{totals.pilgrimPct}</td>
              <td className="border p-2 text-center">{totals.eventsPct}</td>
              <td className="border p-2 text-center">{totals.localPct}</td>
            </tr>

            {/* AVG Row */}
            <tr className="bg-gradient-to-r from-cyan-800 to-cyan-900 font-bold text-white">
              <td colSpan={2} className="border p-2 text-center">
                AVG
              </td>
              <td className="border p-2 text-right">{averages.contract}</td>
              <td className="border p-2 text-right">{averages.corp}</td>
              <td className="border p-2 text-right">{averages.total}</td>
              <td className="border p-2 text-right">{averages.total2}</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-right">{averages.total3}</td>
              <td className="border p-2 text-right">{averages.wedding}</td>
              <td className="border p-2 text-right">{averages.vacation}</td>
              <td className="border p-2 text-right">{averages.pilgrim}</td>
              <td className="border p-2 text-right">{averages.events}</td>
              <td className="border p-2 text-right">{averages.local}</td>
              <td className="border p-2 text-right">{averages.total3}</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
            </tr>
          </tbody>
        </table>

        {/* Summary Footer */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">
              📊 ANALYSIS - BILLING TYPE SUMMARY
            </span>
            <span className="text-gray-700">
              Total Billings:{" "}
              <span className="font-bold text-blue-800">{totals.total2}</span>
            </span>
            <span className="bg-purple-200 px-4 py-1.5 rounded-full text-purple-900 font-bold">
              PERSUMA: {totals.persumaPct}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
