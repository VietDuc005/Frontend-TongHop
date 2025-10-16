import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ReportManagement = () => {
  // ======= Dữ liệu mẫu =======
  const customers = [
    { tenKH: "Nguyễn Văn A", soDienThoai: "0901234567", tongChiTieu: 25000000, loaiKhach: "VIP" },
    { tenKH: "Lê Văn C", soDienThoai: "0923456789", tongChiTieu: 32000000, loaiKhach: "VIP" },
    { tenKH: "Hoàng Văn E", soDienThoai: "0945678901", tongChiTieu: 18000000, loaiKhach: "VIP" },
    { tenKH: "Phạm Thị D", soDienThoai: "0934567890", tongChiTieu: 12000000, loaiKhach: "Thường" },
    { tenKH: "Trần Thị B", soDienThoai: "0912345678", tongChiTieu: 8500000, loaiKhach: "Thường" },
  ];

  const mechanicStats = [
    { name: "Nguyễn Văn Thợ", soPhieu: 35, doanhThu: 45 },
    { name: "Trần Văn Sửa", soPhieu: 28, doanhThu: 38 },
    { name: "Lê Văn Chữa", soPhieu: 42, doanhThu: 52 },
    { name: "Phạm Văn Bảo", soPhieu: 31, doanhThu: 41 },
    { name: "Hoàng Văn Dưỡng", soPhieu: 25, doanhThu: 35 },
  ];

  const repairStatus = [
    { name: "Hoàn thành", value: 45, color: "#10b981" },
    { name: "Đang sửa", value: 35, color: "#3b82f6" },
    { name: "Chờ xử lý", value: 20, color: "#f59e0b" },
  ];

  // ======= Helper =======
  const toMillions = (v) => `${(v / 1_000_000).toFixed(1)}M`;

  // ======= Render giao diện =======
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Báo cáo tổng hợp</h2>

      {/* 3 thẻ thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Doanh thu tháng này</h3>
          <p className="text-3xl font-bold text-blue-600">67.5M</p>
          <p className="text-sm text-green-600 mt-2">+15.3% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Số phiếu trong tháng</h3>
          <p className="text-3xl font-bold text-orange-600">89</p>
          <p className="text-sm text-green-600 mt-2">+8 phiếu so với tháng trước</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Khách hàng mới</h3>
          <p className="text-3xl font-bold text-green-600">23</p>
          <p className="text-sm text-green-600 mt-2">+5 khách so với tháng trước</p>
        </div>
      </div>

      {/* Biểu đồ cột thống kê theo thợ */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê theo thợ</h3>
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

      {/* 2 biểu đồ nhỏ: top khách VIP + trạng thái phiếu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 khách VIP */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 khách hàng VIP</h3>
          <div className="space-y-3">
            {customers
              .filter((c) => c.loaiKhach === "VIP")
              .map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{c.tenKH}</p>
                    <p className="text-sm text-gray-500">{c.soDienThoai}</p>
                  </div>
                  <p className="font-bold text-blue-600">{toMillions(c.tongChiTieu)}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Trạng thái phiếu sửa chữa */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng thái phiếu sửa chữa</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={repairStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
    </div>
  );
};

export default ReportManagement;
