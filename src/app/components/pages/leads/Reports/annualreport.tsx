"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import {
  fetchAnnualReport,
  setYear,
} from "../../../../features/AnnualReport/annualreportSlice";

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

const daysHeaders = [
  "#",
  "MTH",
  "1 day",
  "2-3 day",
  "4-5 day",
  "6-7 day",
  "8-10 day",
  ">10 day",
  "TOTAL",
];

const sourceHeaders = [
  "CALL",
  "WA",
  "GAC",
  "GAQ",
  "eMAIL",
  "REF/LW",
  "REP-C",
  "Meta",
  "TOTAL",
];

const paxHeaders = [
  "6-7",
  "8-10",
  "11-13",
  "14-20",
  "21-30",
  "31-40",
  "41-50",
  ">50",
  "TOTAL",
];

// Function to get color class based on column index for Days section
const getDaysColumnColor = (columnIndex: number, isTotal: boolean = false) => {
  if (isTotal) return "bg-green-500 text-white font-bold";

  switch (columnIndex) {
    case 0: // 1 day column
    case 1: // 2-3 day column
      return "bg-green-100 text-green-800";
    case 2: // 4-5 day column
    case 3: // 6-7 day column
      return "bg-blue-100 text-blue-800";
    case 4: // 8-10 day column
    case 5: // >10 day column
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-green-100 text-green-800";
  }
};

// Function to get color class based on column index for Source section
const getSourceColumnColor = (
  columnIndex: number,
  isTotal: boolean = false,
) => {
  if (isTotal) return "bg-green-500 text-white font-bold";

  switch (columnIndex) {
    case 0: // CALL
      return "bg-purple-100 text-purple-800";
    case 1: // WA
    case 2: // GAC
    case 3: // GAQ
    case 4: // eMAIL
      return "bg-red-100 text-red-800";
    case 5: // REF/LW
    case 6: // REP-C
    case 7: // Meta
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-purple-100 text-purple-800";
  }
};

// Function to get color class based on column index for Pax section
const getPaxColumnColor = (columnIndex: number, isTotal: boolean = false) => {
  if (isTotal) return "bg-green-500 text-white font-bold";

  // All PAX columns (0-7) get blue color
  return "bg-blue-100 text-blue-800";
};

export default function EnquiryFullTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { daysData, sourceData, paxData, year, loading, error } = useSelector(
    (state: RootState) => state.annualReport,
  );

  useEffect(() => {
    dispatch(fetchAnnualReport(year));
  }, [dispatch, year]);

  /* ---------------- TOTAL ROW ---------------- */

  const totalRows = (arr: any[][]) => {
    if (!arr || !arr.length) return [];

    const cols = arr[0].length;
    const totals = new Array(cols).fill(0);

    arr.forEach((row) => {
      row.forEach((val, i) => {
        const num = Number(val) || 0;
        if (i !== cols - 1) totals[i] += num;
      });
    });

    totals[cols - 1] = totals.slice(0, cols - 1).reduce((a, b) => a + b, 0);
    return totals;
  };

  const avgRows = (totals: number[]) =>
    totals.map((v, i) => (i === totals.length - 1 ? v : Math.round(v / 12)));

  /* ---------------- CALCULATIONS ---------------- */

  const daysTotals = useMemo(() => totalRows(daysData), [daysData]);
  const sourceTotals = useMemo(() => totalRows(sourceData), [sourceData]);
  const paxTotals = useMemo(() => totalRows(paxData), [paxData]);

  const daysTotalSum = daysTotals.at(-1) || 0;
  const sourceTotalSum = sourceTotals.at(-1) || 0;
  const paxTotalSum = paxTotals.at(-1) || 0;

  const daysPercentages = daysTotals
    .slice(0, -1)
    .map((v) => (v ? Math.round((v / daysTotalSum) * 100) : 0));

  const sourcePercentages = sourceTotals
    .slice(0, -1)
    .map((v) => (v ? Math.round((v / sourceTotalSum) * 100) : 0));

  const paxPercentages = paxTotals
    .slice(0, -1)
    .map((v) => (v ? Math.round((v / paxTotalSum) * 100) : 0));

  const handleYearChange = (newYear: number) => {
    dispatch(setYear(newYear));
    dispatch(fetchAnnualReport(newYear));
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 font-bold">{error}</div>;

  return (
    <div className="w-full overflow-auto">
      {/* HEADER */}

      <div className="sticky top-0 bg-orange-100 p-3 rounded-md flex justify-between">
        <h2 className="text-3xl font-bold text-orange-600">
          📊 Annual Leads Report – {year}
        </h2>

        <select
          value={year}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="border px-3 py-2 font-semibold rounded"
        >
          {["2024", "2025", "2026", "2027"].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}

      <div className="mt-3 bg-white border rounded-lg p-2">
        <table className="w-full border-collapse text-center font-semibold text-sm">
          <thead>
            {/* SECTION HEADER */}

            <tr>
              <th
                colSpan={daysHeaders.length}
                className="bg-blue-950 text-white p-3 border border-white text-base"
              >
                ENQUIRY ANALYSIS - DAYS
              </th>

              <th
                colSpan={sourceHeaders.length}
                className="bg-blue-950 text-white p-3 border border-white text-base"
              >
                ENQUIRY ANALYSIS - SOURCE
              </th>

              <th
                colSpan={paxHeaders.length}
                className="bg-blue-950 text-white p-3 border border-white text-base"
              >
                ENQUIRY ANALYSIS - PAX
              </th>
            </tr>

            {/* COLUMN HEADER */}

            <tr className="bg-red-200">
              {daysHeaders.map((h, i) => (
                <th
                  key={i}
                  className={`border p-2 ${
                    i === daysHeaders.length - 1
                      ? "bg-green-800 text-white"
                      : i === 2 || i === 3 // 1 day, 2-3 day
                        ? "bg-green-200 text-green-800"
                        : i === 4 || i === 5 // 4-5 day, 6-7 day
                          ? "bg-blue-200 text-blue-800"
                          : i === 6 || i === 7 // 8-10 day, >10 day
                            ? "bg-purple-200 text-purple-800"
                            : ""
                  }`}
                >
                  {h}
                </th>
              ))}

              {sourceHeaders.map((h, i) => (
                <th
                  key={i}
                  className={`border p-2 ${
                    i === sourceHeaders.length - 1
                      ? "bg-green-800 text-white"
                      : i === 0 // CALL
                        ? "bg-purple-200 text-purple-800"
                        : i >= 1 && i <= 4 // WA, GAC, GAQ, eMAIL
                          ? "bg-red-200 text-red-800"
                          : i >= 5 && i <= 7 // REF/LW, REP-C, Meta
                            ? "bg-purple-200 text-purple-800"
                            : ""
                  }`}
                >
                  {h}
                </th>
              ))}

              {paxHeaders.map((h, i) => (
                <th
                  key={i}
                  className={`border p-2 ${
                    i === paxHeaders.length - 1
                      ? "bg-green-800 text-white"
                      : "bg-blue-200 text-blue-800" // All PAX headers blue
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {months.map((m, i) => (
              <tr key={i} className="h-2">
                <td className="border bg-red-100 font-bold p-2 ">{i + 1}</td>

                <td className="border bg-gray-100 font-bold p-2 ">{m}</td>

                {/* DAYS */}
                {daysData[i]?.map((v: any, j: number) => {
                  const isTotal = j === daysData[i].length - 1;
                  const colorClass = getDaysColumnColor(j, isTotal);

                  return (
                    <td
                      key={j}
                      className={`border p-2 border-white ${colorClass}`}
                    >
                      {Number(v) || 0}
                    </td>
                  );
                })}

                {/* SOURCE */}
                {sourceData[i]?.map((v: any, j: number) => {
                  const isTotal = j === sourceData[i].length - 1;
                  const colorClass = getSourceColumnColor(j, isTotal);

                  return (
                    <td
                      key={j}
                      className={`border p-2 border-white ${colorClass}`}
                    >
                      {Number(v) || 0}
                    </td>
                  );
                })}

                {/* PAX */}
                {paxData[i]?.map((v: any, j: number) => {
                  const isTotal = j === paxData[i].length - 1;
                  const colorClass = getPaxColumnColor(j, isTotal);

                  return (
                    <td
                      key={j}
                      className={`border p-2 border-white ${colorClass}`}
                    >
                      {Number(v) || 0}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            {/* TOTAL */}

            <tr className="bg-green-400 text-white font-bold border border-gray-300 h-9">
              <td colSpan={2} className="p-2 border border-white">
                TOTAL
              </td>

              {daysTotals.map((v, i) => (
                <td
                  key={i}
                  className={`p-2 border border-white ${
                    i === daysTotals.length - 1 ? "bg-green-500" : ""
                  }`}
                >
                  {v}
                </td>
              ))}

              {/* Source Totals with colors */}
              {sourceTotals.map((v, i) => (
                <td
                  key={i}
                  className={`p-2  border border-white ${
                    i === sourceTotals.length - 1 ? "bg-green-500" : ""
                  }`}
                >
                  {v}
                </td>
              ))}

              {/* PAX Totals with blue colors */}
              {paxTotals.map((v, i) => (
                <td
                  key={i}
                  className={`p-2 border border-white ${
                    i === paxTotals.length - 1 ? "bg-green-500" : "" // All PAX totals blue
                  }`}
                >
                  {v}
                </td>
              ))}
            </tr>

            {/* AVG */}

            <tr className="bg-blue-300 font-bold border border-gray-300 h-9">
              <td colSpan={2} className="p-2 ">
                AVG
              </td>

              {avgRows(daysTotals).map((v, i) => (
                <td
                  key={i}
                  className={`border p-2 ${
                    i === daysTotals.length - 1
                      ? "bg-green-500 text-white"
                      : "bg-blue-300" // All non-total cells blue
                  }`}
                >
                  {v}
                </td>
              ))}

              {/* Source Avg with colors */}
              {avgRows(sourceTotals).map((v, i) => (
                <td
                  key={i}
                  className={`p-2 border border-white ${
                    i === sourceTotals.length - 1
                      ? "bg-green-500 text-white"
                      : "bg-blue-300"
                  }`}
                >
                  {v}
                </td>
              ))}

              {/* PAX Avg with blue colors */}
              {avgRows(paxTotals).map((v, i) => (
                <td
                  key={i}
                  className={`p-2 border border-white ${
                    i === paxTotals.length - 1
                      ? "bg-green-500 text-white"
                      : "bg-blue-300" // All PAX averages blue
                  }`}
                >
                  {v}
                </td>
              ))}
            </tr>

            {/* % */}

            <tr className="bg-yellow-200 font-bold h-9">
              <td colSpan={2} className="p-2 border border-white">
                %
              </td>

              {daysPercentages.map((v, i) => (
                <td
                  key={i}
                  className={`p-2 border border-white ${i === 0 || i === 1 ? "bg-yellow-200" : ""}`}
                >
                  {v}%
                </td>
              ))}
              <td className="bg-green-500 text-white p-2 ">100%</td>

              {/* Source Percentages with colors */}
              {sourcePercentages.map((v, i) => (
                <td key={i} className={`p-2 border border-white ${i === 0 ? "bg-yellow-200" : ""}`}>
                  {v}%
                </td>
              ))}
              <td className="bg-green-500 text-white p-2">100%</td>

              {/* PAX Percentages with blue colors */}
              {paxPercentages.map((v, i) => (
                <td
                  key={i}
                  className="p-2 bg-yellow-200 border border-white" // All PAX percentages blue
                >
                  {v}%
                </td>
              ))}
              <td className="bg-green-500 text-white p-2">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
