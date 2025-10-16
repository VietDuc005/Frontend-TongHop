// src/pages/Dashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, Car, Users, FileText } from "lucide-react";
import StatsCard from "../components/common/StatsCard"; // ✅ export default
import { formatCurrency } from "../utils/helpers"; // ✅ helper định dạng tiền

const Dashboard = () => {
  const statsCards = [
    {
      title: "Tổng doanh thu",
      value: "328.5M",
      icon: DollarSign,
      color: "bg-blue-500",
      change: "+12.5%",
    },
    {
      title: "Số xe đang sửa",
      value: "24",
      icon: Car,
      color: "bg-orange-500",
      change: "+3",
    },
    {
      title: "Khách hàng",
      value: "1,247",
      icon: Users,
      color: "bg-green-500",
      change: "+87",
    },
    {
      title: "Phiếu hoàn thành",
      value: "156",
      icon: FileText,
      color: "bg-purple-500",
      change: "+23",
    },
  ];

  const revenueData = [
    { month: "T1", revenue: 45000000 },
    { month: "T2", revenue: 52000000 },
    { month: "T3", revenue: 48000000 },
    { month: "T4", revenue: 61000000 },
    { month: "T5", revenue: 55000000 },
    { month: "T6", revenue: 67000000 },
  ];

  const serviceData = [
    { name: "Bảo dưỡng", value: 35, color: "#3b82f6" },
    { name: "Sửa chữa", value: 45, color: "#ef4444" },
    { name: "Thay thế", value: 20, color: "#10b981" },
  ];

  const topServices = [
    { name: "Thay dầu động cơ", count: 156, revenue: 23400000 },
    { name: "Bảo dưỡng định kỳ", count: 98, revenue: 49000000 },
    { name: "Sửa hệ thống phanh", count: 67, revenue: 33500000 },
    { name: "Thay lốp xe", count: 134, revenue: 26800000 },
  ];

  return (
    <div className="space-y-6">
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* --- Charts --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Doanh thu 6 tháng gần đây
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Phân loại dịch vụ
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Top Services Table --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dịch vụ hàng đầu
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Tên dịch vụ
                </th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">
                  Số lượng
                </th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((service, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-800">{service.name}</td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {service.count}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-800 font-semibold">
                    {formatCurrency(service.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ✅ export default để App.jsx nhận đúng
export default Dashboard;
