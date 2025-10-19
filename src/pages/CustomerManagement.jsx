// src/pages/CustomerManagement.jsx
import React, { useState } from "react";
import Table from "../components/common/Table"; // ✅ dùng component chung
import { Plus } from "lucide-react";

const CustomerManagement = () => {
  const [customers] = useState([
    {
      id: "KH001",
      name: "Anh Nam",
      phone: "0987654321",
      email: "anhnam@email.com",
      address: "123 Đường Láng, Đống Đa, Hà Nội",
      status: "Hoạt động",
    },
    {
      id: "KH002",
      name: "Chị Lan",
      phone: "0912345678",
      email: "chilan@email.com",
      address: "45 Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
      status: "Hoạt động",
    },
    {
      id: "KH003",
      name: "Anh Tuấn",
      phone: "0934567890",
      email: "anhtuan@email.com",
      address: "78 Cầu Giấy, Cầu Giấy, Hà Nội",
      status: "Dừng hoạt động",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");

  // --- Lọc khách hàng ---
  const filteredCustomers = customers.filter((c) => {
    const matchSearch = Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "Tất cả trạng thái" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // --- Cấu hình cột cho bảng ---
  const columns = [
    {
      key: "name",
      label: "Khách hàng",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{value}</span>
          <span className="text-xs text-gray-500">{row.id}</span>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Liên hệ",
      render: (value, row) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>{row.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>✉️</span>
            <span>{row.email}</span>
          </div>
        </div>
      ),
    },
    { key: "address", label: "Địa chỉ" },
    {
      key: "status",
      label: "Trạng thái",
      render: (value) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            value === "Hoạt động"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // --- Hành động ---
  const handleView = (row) => alert(`📋 Xem chi tiết: ${row.name}`);
  const handleEdit = (row) => alert(`📝 Sửa khách hàng: ${row.name}`);

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Khách hàng</h2>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} /> Thêm khách hàng
        </button>
      </div>

      {/* --- Bộ lọc và tìm kiếm --- */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1 flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          >
            <option>Tất cả trạng thái</option>
            <option>Hoạt động</option>
            <option>Dừng hoạt động</option>
          </select>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
          Tìm kiếm
        </button>
      </div>

      {/* --- Bảng khách hàng tái sử dụng Table.jsx --- */}
      <Table
        columns={columns}
        data={filteredCustomers}
        onView={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CustomerManagement;
