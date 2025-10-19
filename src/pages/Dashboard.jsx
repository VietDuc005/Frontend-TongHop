import React from "react";
import {
  ResponsiveContainer,
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
} from "recharts";
import {
  DollarSign,
  Car,
  Users,
  FileText,
  Wrench,
  Star,
} from "lucide-react";
import StatsCard from "../components/common/StatsCard";
import { formatCurrency } from "../utils/helpers";

// =================== DỮ LIỆU GIẢ LẬP ===================
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

  const mechanicStats = [
    { name: "Nguyễn Văn Thợ", soPhieu: 35, doanhThu: 45 },
    { name: "Trần Văn Sửa", soPhieu: 28, doanhThu: 38 },
    { name: "Lê Văn Chữa", soPhieu: 42, doanhThu: 52 },
    { name: "Phạm Văn Bảo", soPhieu: 31, doanhThu: 41 },
  ];

  const serviceData = [
    { name: "Bảo dưỡng", value: 35, color: "#3b82f6" },
    { name: "Sửa chữa", value: 45, color: "#ef4444" },
    { name: "Thay thế", value: 20, color: "#10b981" },
  ];

  const repairStatus = [
    { name: "Hoàn thành", value: 45, color: "#10b981" },
    { name: "Đang sửa", value: 35, color: "#3b82f6" },
    { name: "Chờ xử lý", value: 20, color: "#f59e0b" },
  ];

  const topCustomers = [
    { name: "Nguyễn Văn A", phone: "0901 234 567", spending: 25_000_000 },
    { name: "Lê Văn C", phone: "0923 456 789", spending: 32_000_000 },
    { name: "Hoàng Văn E", phone: "0945 678 901", spending: 18_000_000 },
    { name: "Phạm Thị D", phone: "0934 567 890", spending: 12_000_000 },
    { name: "Trần Thị B", phone: "0912 345 678", spending: 8_500_000 },
  ];

  const topServices = [
    { name: "Thay dầu động cơ", count: 156, revenue: 23400000 },
    { name: "Bảo dưỡng định kỳ", count: 98, revenue: 49000000 },
    { name: "Sửa hệ thống phanh", count: 67, revenue: 33500000 },
    { name: "Thay lốp xe", count: 134, revenue: 26800000 },
  ];

  // =================== GIAO DIỆN ===================
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Tổng quan gara</h2>

      {/* --- THẺ THỐNG KÊ NHANH --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* --- DOANH THU & PHÂN LOẠI DỊCH VỤ --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line chart doanh thu */}
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

        {/* Pie chart loại dịch vụ */}
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

      {/* --- BIỂU ĐỒ CỘT THEO THỢ --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Năng suất theo thợ
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mechanicStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="soPhieu" fill="#3b82f6" name="Số phiếu" />
            <Bar dataKey="doanhThu" fill="#10b981" name="Doanh thu (triệu)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- TOP KHÁCH HÀNG VIP & TRẠNG THÁI PHIẾU --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Khách hàng VIP */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top khách hàng VIP
          </h3>
          <div className="space-y-3">
            {topCustomers.slice(0, 5).map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>
                <p className="font-bold text-blue-600">
                  {formatCurrency(c.spending)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trạng thái phiếu */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Trạng thái phiếu sửa chữa
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={repairStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {repairStatus.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- DỊCH VỤ HÀNG ĐẦU --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dịch vụ được sử dụng nhiều nhất
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Tên dịch vụ
                </th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">
                  Số lượt
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

export default Dashboard;
