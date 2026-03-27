"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnwantedLeads } from "../../../../features/lead/leadSlice";
import { RootState, AppDispatch } from "../../../../redux/store";

interface LeadRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  email?: string;
  source?: string;
  status?: string;
  createdAt?: string;
  assignedTo?: string;
  unwanted_status?: "unwanted" | "wanted";
}

export default function PreTabla() {
  const dispatch = useDispatch<AppDispatch>(); // Add AppDispatch type

  const unwantedLeads = useSelector(
    (state: RootState) => state.lead.unwantedLeads,
  );
  const loading = useSelector(
    (state: RootState) => state.lead.unwantedLeadsLoading,
  );

  useEffect(() => {
    dispatch(fetchUnwantedLeads());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading unwanted leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Unwanted Leads</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Export Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Lost Reason</th>
              <th className="px-6 py-3">Lost Reason Details</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unwantedLeads.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No unwanted leads found
                </td>
              </tr>
            ) : (
              unwantedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{lead.date || lead.date}</td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {lead.customerName || lead.customerName}
                  </td>
                  <td className="px-6 py-4">
                    {lead.customerPhone || lead.customerName}
                  </td>
                  <td className="px-6 py-4">
                    {lead.customerCity || lead.customerCity}
                  </td>
                  <td className="px-6 py-4">
                    {lead.lost_reason || lead.lost_reason}
                  </td>
                  <td className="px-6 py-4">
                    {lead.lostReasonDetails || lead.lostReasonDetails}
                  </td>

                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {unwantedLeads.length} unwanted leads
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
