import React, { useState } from "react";

const teamData = {
  RENU: [
    {
      mth: "APR",
      blank: 8,
      kyc: 3,
      rfq: 3,
      lost: 25,
      book: 4,
      total: 43,
      con: "9%",
    },
    {
      mth: "MAY",
      blank: 5,
      kyc: 18,
      rfq: 22,
      lost: 116,
      book: 10,
      total: 171,
      con: "6%",
    },
    {
      mth: "JUN",
      blank: 4,
      kyc: 9,
      rfq: 30,
      lost: 101,
      book: 12,
      total: 156,
      con: "8%",
    },
    {
      mth: "JUL",
      blank: 0,
      kyc: 1,
      rfq: 1,
      lost: 53,
      book: 7,
      total: 62,
      con: "11%",
    },
    {
      mth: "AUG",
      blank: 0,
      kyc: 2,
      rfq: 32,
      lost: 33,
      book: 8,
      total: 75,
      con: "11%",
    },
    {
      mth: "SEP",
      blank: 3,
      kyc: 4,
      rfq: 23,
      lost: 27,
      book: 3,
      total: 60,
      con: "5%",
    },
    {
      mth: "OCT",
      blank: 2,
      kyc: 10,
      rfq: 19,
      lost: 51,
      book: 15,
      total: 97,
      con: "15%",
    },
    {
      mth: "NOV",
      blank: 35,
      kyc: 79,
      rfq: 100,
      lost: 28,
      book: 17,
      total: 259,
      con: "7%",
    },
    {
      mth: "DEC",
      blank: 7,
      kyc: 23,
      rfq: 30,
      lost: 118,
      book: 15,
      total: 193,
      con: "8%",
    },
    {
      mth: "JAN",
      blank: 20,
      kyc: 31,
      rfq: 65,
      lost: 22,
      book: 11,
      total: 149,
      con: "7%",
    },
    {
      mth: "FEB",
      blank: 34,
      kyc: 35,
      rfq: 28,
      lost: 7,
      book: 8,
      total: 112,
      con: "7%",
    },
    {
      mth: "MAR",
      blank: 22,
      kyc: 6,
      rfq: 6,
      lost: 0,
      book: 1,
      total: 35,
      con: "3%",
    },
  ],
  CHITRA: [
    {
      mth: "APR",
      blank: 8,
      kyc: 3,
      rfq: 3,
      lost: 25,
      book: 4,
      total: 43,
      con: "9%",
    },
    {
      mth: "MAY",
      blank: 5,
      kyc: 18,
      rfq: 22,
      lost: 116,
      book: 10,
      total: 171,
      con: "6%",
    },
    {
      mth: "JUN",
      blank: 4,
      kyc: 9,
      rfq: 30,
      lost: 101,
      book: 12,
      total: 156,
      con: "8%",
    },
    {
      mth: "JUL",
      blank: 0,
      kyc: 1,
      rfq: 1,
      lost: 53,
      book: 7,
      total: 62,
      con: "11%",
    },
    {
      mth: "AUG",
      blank: 0,
      kyc: 2,
      rfq: 32,
      lost: 33,
      book: 8,
      total: 75,
      con: "11%",
    },
    {
      mth: "SEP",
      blank: 3,
      kyc: 4,
      rfq: 23,
      lost: 27,
      book: 3,
      total: 60,
      con: "5%",
    },
    {
      mth: "OCT",
      blank: 2,
      kyc: 10,
      rfq: 19,
      lost: 51,
      book: 15,
      total: 97,
      con: "15%",
    },
    {
      mth: "NOV",
      blank: 35,
      kyc: 79,
      rfq: 100,
      lost: 28,
      book: 17,
      total: 259,
      con: "7%",
    },
    {
      mth: "DEC",
      blank: 7,
      kyc: 23,
      rfq: 30,
      lost: 118,
      book: 15,
      total: 193,
      con: "8%",
    },
    {
      mth: "JAN",
      blank: 20,
      kyc: 31,
      rfq: 65,
      lost: 22,
      book: 11,
      total: 149,
      con: "7%",
    },
    {
      mth: "FEB",
      blank: 34,
      kyc: 35,
      rfq: 28,
      lost: 7,
      book: 8,
      total: 112,
      con: "7%",
    },
    {
      mth: "MAR",
      blank: 22,
      kyc: 6,
      rfq: 6,
      lost: 0,
      book: 1,
      total: 35,
      con: "3%",
    },
  ],
};

const months = [
  { name: "JAN", value: 1 },
  { name: "FEB", value: 2 },
  { name: "MAR", value: 3 },
  { name: "APR", value: 4 },
  { name: "MAY", value: 5 },
  { name: "JUN", value: 6 },
  { name: "JUL", value: 7 },
  { name: "AUG", value: 8 },
  { name: "SEP", value: 9 },
  { name: "OCT", value: 10 },
  { name: "NOV", value: 11 },
  { name: "DEC", value: 12 },
];

const Empreport = () => {
  const [selectedMonth, setSelectedMonth] = useState("APR");
  const [year, setYear] = useState("2025");

  return (
    <div className="">
      {/* HEADER */}

      <div className="sticky top-0 z-10 bg-orange-100 p-3 rounded-md">
        <div className="flex justify-between items-center">
          <div className="pl-4 border-l-8 border-orange-500 bg-white px-3 rounded-md shadow-md">
            <h2 className="text-4xl font-bold text-left py-4 text-orange-600">
              📊 Employee Leads Report – {selectedMonth} {year}
            </h2>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border-black border rounded px-3 py-2 font-semibold bg-white"
            >
              {months.map((m) => (
                <option key={m.name}>{m.name}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border-black border rounded font-semibold bg-white"
            >
              {["2024", "2025", "2026", "2027"].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
      <div className="mb-4 p-4 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center">
          {Object.entries(teamData).map(([name, data]) => (
            <div key={name} className="border-4 border-green-800 p-2 w-auto">
              <h2 className="text-center font-bold text-lg">{name}</h2>
              <table className="table-auto w-full text-xs border-collapse border border-green-800">
                <thead className="border-b border-r border-green-800">
                  <tr>
                    <th className="border px-1 py-1">#</th>
                    <th className="border px-1 py-1 bg-yellow-300">MTH</th>
                    <th className="border px-1 py-1  bg-orange-100 font-extrabold text-orange-700 text-md">
                      BLK
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-orange-700 text-md">
                      KYC
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-yellow-700 text-md">
                      RFQ
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-red-700 text-md">
                      L/Veh
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-green-700 text-md">
                      BOOK
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-black text-md">
                      TOTAL
                    </th>
                    <th className="border px-1 py-1 bg-orange-100 font-extrabold text-purple-700 text-md">
                      CON.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="border border-green-800 px-1 py-1">
                        {idx + 4}
                      </td>
                      <td className="border border-green-800 px-1 py-1 font-semibold bg-white">
                        {row.mth}
                      </td>
                      <td className="border border-green-800 px-1 py-1 bg-white">
                        {row.blank}
                      </td>
                      <td className="border border-green-800 px-1 py-1 bg-white">
                        {row.kyc}
                      </td>
                      <td className="border border-green-800 px-1 py-1 bg-white">
                        {row.rfq}
                      </td>
                      <td className="border border-green-800 px-1 py-1 bg-white">
                        {row.lost}
                      </td>
                      <td className="border border-green-800 px-1 py-1 font-semibold bg-white">
                        {row.book}
                      </td>
                      <td className="border border-green-800 px-1 py-1 font-semibold bg-white">
                        {row.total}
                      </td>
                      <td className="border border-green-800 px-1 py-1 text-purple-700 font-semibold bg-white">
                        {row.con}
                      </td>
                    </tr>
                  ))}
                  {/* TOTAL and AVG rows */}
                  <tr className="text-center font-bold bg-yellow-300">
                    <td
                      className="border border-green-800 px-1 py-1"
                      colSpan={2}
                    >
                      TOTAL
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.blank, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.kyc, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.rfq, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.lost, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.book, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {data.reduce((sum, row) => sum + row.total, 0)}
                    </td>
                    <td className="border border-green-800 px-1 py-1">-</td>
                  </tr>
                  <tr className="text-center font-bold bg-yellow-300">
                    <td
                      className="border border-green-800 px-1 py-1"
                      colSpan={2}
                    >
                      AVG
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.blank, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.kyc, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.rfq, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.lost, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.book, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">
                      {Math.round(
                        data.reduce((sum, row) => sum + row.total, 0) /
                          data.length,
                      )}
                    </td>
                    <td className="border border-green-800 px-1 py-1">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Empreport;
