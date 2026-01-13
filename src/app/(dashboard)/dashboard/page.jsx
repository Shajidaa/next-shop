// app/dashboard/page.jsx
"use client";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Hello, {user?.data?.name || user?.email || user?.role}! 👋
        </h2>
        <p className="text-gray-500 mt-2">
          Welcome to your personalized dashboard. You have access to
          <span className="font-semibold text-blue-600">
            {" "}
            {user?.permissions?.length || 0} modules
          </span>
          .
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-400 font-medium uppercase">
            Active Sessions
          </p>
          <p className="text-3xl font-bold text-gray-800">1</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-400 font-medium uppercase">
            Account Status
          </p>
          <p className="text-3xl font-bold text-green-500">Verified</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-400 font-medium uppercase">Role</p>
          <p className="text-3xl font-bold text-blue-600 capitalize">
            {user?.data?.role || "Member"}
          </p>
        </div>
      </div>

      {/* Permission Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Authorized Modules</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-400">
              <th className="px-6 py-3">Module Name</th>
              <th className="px-6 py-3">Sub-menus</th>
              <th className="px-6 py-3">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {user?.permissions?.map((perm) => (
              <tr key={perm.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {perm.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {perm.children?.map((c) => c.label).join(", ") || "None"}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-semibold">
                    Enabled
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
