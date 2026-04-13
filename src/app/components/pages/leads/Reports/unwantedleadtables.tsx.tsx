"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnwantedLeads } from "../../../../features/lead/leadSlice";
import { RootState, AppDispatch } from "../../../../redux/store";
import { LeadRecord } from "@/types/types"; // ✅ import from single source

export default function PreTabla() {
  const dispatch = useDispatch<AppDispatch>();

  const { unwantedLeads, unwantedLeadsLoading } = useSelector(
    (state: RootState) => state.lead
  );

  useEffect(() => {
    dispatch(fetchUnwantedLeads());
  }, [dispatch]);

  // ✅ Date formatter
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (unwantedLeadsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">
          Loading unwanted leads...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pl-4 border-l-8 border-orange-600 bg-orange-100 px-3 rounded-md shadow-sm">
        <h2 className="text-4xl font-bold py-4 text-orange-700">
          📊 Unwanted Leads
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Lost Reason</th>
              <th className="px-6 py-3">Details</th>
            </tr>
          </thead>

          <tbody>
            {unwantedLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No unwanted leads found
                </td>
              </tr>
            ) : (
              unwantedLeads.map((lead: LeadRecord) => (
                <tr key={lead.leadId} className="border-b">
                  <td className="px-6 py-4">
                    {formatDate(lead.updatedAt || lead.createdAt)}
                  </td>

                  {/* ✅ Name Fix */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {lead.fullName ||
                      [lead.firstName, lead.middleName, lead.lastName]
                        .filter(Boolean)
                        .join(" ") ||
                      "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {lead.customerPhone || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {lead.customerCity || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {lead.lost_reason || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {lead.lostReasonDetails || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}