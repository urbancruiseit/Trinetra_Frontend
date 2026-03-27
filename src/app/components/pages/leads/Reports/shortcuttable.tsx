// app/lead-source/page.tsx
import React from "react";

const LeadSourcePage = () => {
  // Lead Source Data exactly as shown in the image
  const leadSourceData = [
    { id: "1", goo: "GOOGLE", call: "CALL", details: "8369681231-GMB/GA/WB" },
    { id: "2", goo: "GOOGLE", call: "GMB-msg", details: "MSG GMB- MUM/DEL" },
    { id: "3", goo: "WEBSITE", call: "WApp", details: "Chat - 8369681231" },
    { id: "4", goo: "WEBSITE", call: "GAC", details: "Get a Quick Call" },
    { id: "5", goo: "WEBSITE", call: "GAQ", details: "Get a Quote / email" },
    { id: "6", goo: "", call: "eMAIL", details: "booking@urbancruise.in" },
    { id: "7", goo: "OFFLINE", call: "REF/W", details: "Reference / Walk-in" },
    { id: "8", goo: "OFFLINE", call: "REP-C", details: "Repeat Customer" },
    { id: "9", goo: "SMM", call: "FB/INS", details: "FB / INSTA LEADS" },
    { id: "10", goo: "SMM", call: "L-IN", details: "Linkedin" },
  ];

  // Function to render table rows with merged cells for duplicate GOO values
  const renderTableRows = () => {
    const rows = [];
    let i = 0; // Start from index 0

    while (i < leadSourceData.length) {
      const currentRow = leadSourceData[i];
      const currentGoo = currentRow.goo;

      // Count how many consecutive rows have the same GOO value
      let mergeCount = 1;
      let j = i + 1;

      while (
        j < leadSourceData.length &&
        leadSourceData[j].goo === currentGoo &&
        currentGoo !== ""
      ) {
        mergeCount++;
        j++;
      }

      // If mergeCount > 1, render a row with merged GOO cell
      if (mergeCount > 1 && currentGoo !== "") {
        rows.push(
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="border-2 border-gray-400 px-4 py-2.5 font-medium align-middle">
              {currentRow.id}
            </td>
            <td
              className="border-2 border-gray-400 px-4 py-2.5 align-middle"
              rowSpan={mergeCount}
            >
              <span className="font-semibold text-blue-600">{currentGoo}</span>
            </td>
            <td className="border-2 border-gray-400 px-4 py-2.5">
              {currentRow.call}
            </td>
            <td className="border-2 border-gray-400 px-4 py-2.5 text-gray-600">
              {currentRow.details}
            </td>
          </tr>,
        );

        // Render the remaining rows in the merged group
        for (let k = i + 1; k < j; k++) {
          rows.push(
            <tr key={k} className={k % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border-2 border-gray-400 px-4 py-2.5 font-medium">
                {leadSourceData[k].id}
              </td>
              {/* GOO column is omitted here because it's merged with the previous row */}
              <td className="border-2 border-gray-400 px-4 py-2.5">
                {leadSourceData[k].call}
              </td>
              <td className="border-2 border-gray-400 px-4 py-2.5 text-gray-600">
                {leadSourceData[k].details}
              </td>
            </tr>,
          );
        }

        i = j;
      } else {
        // No merging needed
        rows.push(
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="border-2 border-gray-400 px-4 py-2.5 font-medium">
              {currentRow.id}
            </td>
            <td className="border-2 border-gray-400 px-4 py-2.5">
              {currentRow.goo && (
                <span className="font-medium">{currentRow.goo}</span>
              )}
            </td>
            <td className="border-2 border-gray-400 px-4 py-2.5">
              {currentRow.call}
            </td>
            <td className="border-2 border-gray-400 px-4 py-2.5 text-gray-600">
              {currentRow.details}
            </td>
          </tr>,
        );
        i++;
      }
    }

    return rows;
  };

  // Calculate stats dynamically
  const stats = {
    google: leadSourceData.filter(item => item.goo === "GOOGLE").length,
    website: leadSourceData.filter(item => item.goo === "WEBSITE").length,
    smm: leadSourceData.filter(item => item.goo === "SMM").length,
    offline: leadSourceData.filter(item => item.goo === "OFFLINE").length,
    empty: leadSourceData.filter(item => item.goo === "").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Lead Source Management
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-800 text-white">
            <h2 className="text-xl font-semibold">LEAD SOURCE</h2>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-gray-700">
                      #
                    </th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-gray-700">
                      GOO
                    </th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-gray-700">
                      CALL
                    </th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-gray-700">
                      DETAILS
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Total Entries:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {leadSourceData.length}
                </span>
              </div>
              <div className="text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Merged Cells Legend */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <p className="text-blue-700">
                <span className="font-semibold">Note:</span> Rows with same GOO
                value are merged vertically for better visualization.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Google Sources:</span>
                <span className="font-medium">{stats.google}</span>
              </div>
              <div className="flex justify-between">
                <span>Website Sources:</span>
                <span className="font-medium">{stats.website}</span>
              </div>
              <div className="flex justify-between">
                <span>Social Media (SMM):</span>
                <span className="font-medium">{stats.smm}</span>
              </div>
              <div className="flex justify-between">
                <span>Offline Sources:</span>
                <span className="font-medium">{stats.offline}</span>
              </div>
              <div className="flex justify-between">
                <span>Other/Empty:</span>
                <span className="font-medium">{stats.empty}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Contact Methods
            </h3>
            <div className="space-y-2 text-sm">
              <div>📞 Phone: 8369681231</div>
              <div>📧 Email: booking@urbancruise.in</div>
              <div>💬 Chat: Available</div>
              <div>📱 WhatsApp: 8369681231</div>
              <div>📱 LinkedIn: Available</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Merged Groups</h3>
            <div className="space-y-2 text-sm">
              <div>📌 GOOGLE: {stats.google} entries (Rows 1-2)</div>
              <div>📌 WEBSITE: {stats.website} entries (Rows 3-5)</div>
              <div>📌 OFFLINE: {stats.offline} entries (Rows 7-8)</div>
              <div>📌 SMM: {stats.smm} entries (Rows 9-10)</div>
              <div className="text-xs text-gray-500 mt-1">
                *All duplicate values are merged
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadSourcePage;