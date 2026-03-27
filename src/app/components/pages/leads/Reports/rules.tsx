// app/dashboard/page.tsx
import React from 'react';

const RulesPage = () => {
  // ========== ENQUIRY MGM DATA ==========
  const teamT20Data = [
    { code: 'MY', names: 'MAYRA / Meenu', color: 'text-blue-600' },
    { code: 'RN', names: 'RASHMI / Ritika', color: 'text-purple-600' },
    { code: 'CT', names: 'CHITRA / Chandani', color: 'text-green-600' },
    { code: 'RM', names: 'SU', color: 'text-orange-600' },
  ];

  const teamT60Data = {
    teamLeaders: ['SUHANI / Sneha'],
    shortLeave: 'SHORT Leave Mgmt',
    noAssign: "DON'T Assign Leads for those Days",
  };

  const scheduleData = {
    morning: '10:00 - 18:30',
    evening: '12:30 - 21:00',
  };

  // ========== LEAD MANAGER DATA ==========
  const tasksData = [
    {
      id: 1,
      status: 'Check BLANK & KYC Leads',
      action: 'Ask T5 to share Rate Quote',
      action2: (
        <div className="space-y-1">
          <div className="font-semibold text-red-600">If-</div>
          <div className="pl-2 space-y-1">
            <div>1️⃣ T5 is Absent or</div>
            <div>2️⃣ T5 already Loaded with other Leads</div>
            <div>3️⃣ 🔄 SWAP the Lead to other T5</div>
            <div>4️⃣ 📝 put in SWAP LEAD Column-BY TC</div>
          </div>
        </div>
      ),
      resp: ['TL'],
      approval: 'Before SWAPPING, take APPROVAL from CITY MGR.',
      priority: 'high',
    },
    {
      id: 2,
      status: 'Check LOST Leads',
      action: 'Ask T5 to PUT Reason in Detail',
      action2: '📋 LOST Reasons will be discussed in DAILY REVIEW',
      resp: ['TL', 'TS'],
      approval: null,
      priority: 'medium',
    },
    {
      id: 3,
      status: 'LOST Leads Cross-Checking',
      action: 'LOST Lead Cross-Checking by CS (5/month)',
      action2: '📋 LOST Reasons will be discussed in DAILY REVIEW',
      resp: ['CS', 'TL', 'CM'],
      approval: null,
      priority: 'medium',
    },
  ];

  const rulesData = [...tasksData];

  // ========== RESPONSIBILITIES MAPPING ==========
  const respMapping = {
    TL: { full: 'Team Lead', color: 'bg-purple-100 text-purple-800' },
    TS: { full: 'Team Supervisor', color: 'bg-blue-100 text-blue-800' },
    CS: { full: 'Customer Support', color: 'bg-green-100 text-green-800' },
    CM: { full: 'City Manager', color: 'bg-orange-100 text-orange-800' },
    TC: { full: 'Team Coordinator', color: 'bg-pink-100 text-pink-800' },
    T5: { full: 'Telecaller Level 5', color: 'bg-indigo-100 text-indigo-800' },
  };

  // ========== ENQUIRY MGM COMPONENT ==========
  const EnquiryMgmSection = () => (
    <div className="mb-12 bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Section Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <span>📞</span> ENQUIRY MGM T
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <h2 className="text-xl font-semibold text-blue-100">## DELHI</h2>
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                F'26
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Today's Schedule</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">Team Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">📊</div>
              <div>
                <div className="text-sm text-blue-600">Total Calls</div>
                <div className="text-2xl font-bold text-blue-800">1,284</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">✉️</div>
              <div>
                <div className="text-sm text-green-600">Email Queries</div>
                <div className="text-2xl font-bold text-green-800">456</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">✅</div>
              <div>
                <div className="text-sm text-purple-600">Converted</div>
                <div className="text-2xl font-bold text-purple-800">789</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Call/Email Stats */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <div className="p-4 font-semibold border-r border-gray-600">📞 CALL WA Email</div>
                <div className="p-4 font-semibold border-r border-gray-600">⚡ T-20 JAN-FEB-MAR</div>
                <div className="p-4 font-semibold">⏱️ T-60 JAN-FEB-MAR</div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-gray-200">
                {/* Row 1 - GAC GAQ GMB */}
                <div className="grid grid-cols-3 bg-blue-50">
                  <div className="p-4 font-bold text-blue-700 border-r border-gray-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    GAC GAQ GMB
                  </div>
                  <div className="p-4 border-r border-gray-200"></div>
                  <div className="p-4"></div>
                </div>

                {/* Row 2 - 10 - 1830 */}
                <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                  <div className="p-4 font-bold text-orange-600 border-r border-gray-200 flex items-center gap-2">
                    <span className="text-lg">⏰</span> 10 - 1830
                  </div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      <span className="text-pink-600 font-medium">Mayra (7)</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-purple-600 font-medium">Renu (7)</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="p-4 border-r border-gray-200"></div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span className="text-indigo-600">Suhani (7)</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      <span className="text-teal-600">Chitra (7)</span>
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                  <div className="p-4 border-r border-gray-200"></div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span className="text-indigo-600">Amit (7)</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      <span className="text-teal-600">Amit (7)</span>
                    </div>
                  </div>
                </div>

                {/* Row 5 - 12:30 - 9 */}
                <div className="grid grid-cols-3 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="p-4 font-bold text-orange-600 border-r border-gray-200 flex items-center gap-2">
                    <span className="text-lg">⏰</span> 12:30 - 9
                  </div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      <span className="text-pink-600 font-medium">Divya</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-purple-600 font-medium">Divya</span>
                    </div>
                  </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                  <div className="p-4 border-r border-gray-200"></div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span className="text-indigo-600">Rashi (5)</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      <span className="text-teal-600">Rashi (5)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Team Info */}
          <div className="space-y-6">
            {/* TEAM - T20 Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-5 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">⚡</div>
                <h3 className="text-xl font-bold text-green-800">TEAM - T20</h3>
                <span className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded-full">Active</span>
              </div>
              <div className="space-y-3">
                {teamT20Data.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-white/50 rounded-lg hover:bg-white transition-colors">
                    <span className="font-mono font-bold text-gray-500 w-8">{member.code}</span>
                    <span className={member.color}>{member.names}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TEAM - T60 Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-lg">⏱️</div>
                <h3 className="text-xl font-bold text-purple-800">TEAM - T60</h3>
              </div>
              
              {/* Team Leaders Section */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-orange-600 mb-2 flex items-center gap-1">
                  <span>👥</span> FOR TEAM LEADERS
                </div>
                <div className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                  <div className="flex items-center gap-2 text-red-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {teamT60Data.shortLeave}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-xl">🚫</span>
                    {teamT60Data.noAssign}
                  </div>
                </div>
              </div>

              {/* Team Member */}
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  <span className="font-medium text-pink-600">{teamT60Data.teamLeaders[0]}</span>
                </div>
              </div>

              {/* Numbered List */}
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-600 mb-2">Priority Tasks:</div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center gap-3 text-gray-600">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {num}
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-400 rounded-full" style={{ width: `${num * 20}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border border-yellow-200 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">📋</div>
              <h4 className="font-semibold text-yellow-800 text-lg">Team Leaders Note</h4>
            </div>
            <p className="text-gray-700">Short leave management and lead assignment restrictions</p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">Important</span>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">Updated Today</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">⏰</div>
              <h4 className="font-semibold text-blue-800 text-lg">Schedule Summary</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Morning Shift:</span>
                <span className="font-semibold text-blue-700">{scheduleData.morning}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Evening Shift:</span>
                <span className="font-semibold text-blue-700">{scheduleData.evening}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ========== LEAD MANAGER COMPONENTS ==========
  const TaskTable = ({ title, data }: { title: string; data: typeof tasksData }) => (
    <div className="mb-10 bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>#</span> {title}
        </h2>
      </div>
      
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <th className="px-6 py-4 text-left font-semibold rounded-tl-lg">#</th>
              <th className="px-6 py-4 text-left font-semibold">STATUS</th>
              <th className="px-6 py-4 text-left font-semibold">ACTION</th>
              <th className="px-6 py-4 text-left font-semibold">ACTION 2</th>
              <th className="px-6 py-4 text-left font-semibold">RESP.</th>
              <th className="px-6 py-4 text-left font-semibold rounded-tr-lg">APPROVAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr 
                key={row.id} 
                className={`hover:bg-blue-50 transition-all duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } ${row.priority === 'high' ? 'border-l-4 border-red-500' : ''}`}
              >
                <td className="px-6 py-4 font-medium">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    row.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {row.id}
                  </span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {row.priority === 'high' && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                    <span className="font-medium text-gray-800">{row.status}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">▶</span>
                    {row.action}
                  </div>
                </td>
                
                <td className="px-6 py-4 text-gray-700">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    {row.action2}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {row.resp.map((r, idx) => (
                      <span key={idx} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        respMapping[r as keyof typeof respMapping]?.color || 'bg-gray-100 text-gray-800'
                      }`}>
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  {row.approval ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 text-lg">⚠️</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-yellow-100 text-yellow-800 text-sm">
                        {row.approval}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xl">🔍</div>
          <h3 className="font-bold text-yellow-800 text-lg">BLANK & KYC Leads</h3>
        </div>
        <p className="text-gray-700 mb-3">Rate Quote required from T5. SWAP if needed with CITY MGR approval.</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">High Priority</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xl">❌</div>
          <h3 className="font-bold text-red-800 text-lg">LOST Leads</h3>
        </div>
        <p className="text-gray-700 mb-3">Detailed reasons required. Discuss in DAILY REVIEW.</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">Critical</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">✓</div>
          <h3 className="font-bold text-blue-800 text-lg">Cross-Checking</h3>
        </div>
        <p className="text-gray-700 mb-3">CS to check 5 LOST leads/month. Review with TL & CM.</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">Monthly Task</span>
        </div>
      </div>
    </div>
  );

  const ResponsibilitiesLegend = () => (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📋</span> Responsibilities Key
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(respMapping).map(([code, { full, color }]) => (
          <div key={code} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
              {code}
            </span>
            <span className="text-xs text-gray-600">{full}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="w-full mx-auto">
        {/* Main Header with Stats */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <span>📊</span> DASHBOARD
          </h1>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          <p className="text-gray-600 mt-3">Enquiry Management & Lead Manager Overview</p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">📞</div>
            <div>
              <div className="text-sm text-gray-500">Today's Calls</div>
              <div className="text-2xl font-bold text-gray-800">156</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">✉️</div>
            <div>
              <div className="text-sm text-gray-500">New Enquiries</div>
              <div className="text-2xl font-bold text-gray-800">43</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl">⏳</div>
            <div>
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-bold text-gray-800">28</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">✅</div>
            <div>
              <div className="text-sm text-gray-500">Converted</div>
              <div className="text-2xl font-bold text-gray-800">85</div>
            </div>
          </div>
        </div>

        {/* Divider with Icon */}
        <div className="relative flex items-center py-8">
          <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
          <div className="flex-shrink mx-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg">
            📞
          </div>
          <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* ENQUIRY MGM SECTION */}
        <EnquiryMgmSection />

        {/* Divider with Icon */}
        <div className="relative flex items-center py-8">
          <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
          <div className="flex-shrink mx-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg">
            👔
          </div>
          <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* LEAD MANAGER SECTION */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>#</span> LEAD MANAGER
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        <TaskTable title="LEAD MANAGER - TASKS" data={tasksData} />
        <TaskTable title="LEAD MANAGER - RULES" data={rulesData} />
        <SummaryCards />
        <ResponsibilitiesLegend />

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Last Updated: Today 10:30 AM</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Active Users: 24</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>© 2024 - Dashboard v2.0</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              <p>⚠️ All SWAP operations require prior approval from City Manager | 📅 Daily Review meetings mandatory for LOST Leads discussion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;