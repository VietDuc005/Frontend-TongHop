// src/pages/EmployeeManagement.jsx
import React, { useState } from "react";
import Table from "../components/common/Table";
import { Plus } from "lucide-react";

const EmployeeManagement = () => {
  const [employees] = useState([
    {
      id: "TK001",
      tenDangNhap: "admin",
      vaiTro: "Admin",
      email: "admin@garage.com",
      trangThai: "Hoạt động",
      ngayTao: "2023-01-01",
    },
    {
      id: "TK002",
      tenDangNhap: "nhanvien1",
      vaiTro: "Nhân viên",
      email: "nv1@garage.com",
      trangThai: "Hoạt động",
      ngayTao: "2023-03-15",
    },
    {
      id: "TK003",
      tenDangNhap: "nhanvien2",
      vaiTro: "Nhân viên",
      email: "nv2@garage.com",
      trangThai: "Hoạt động",
      ngayTao: "2023-06-20",
    },
    {
      id: "TK004",
      tenDangNhap: "nhanvien3",
      vaiTro: "Nhân viên",
      email: "nv3@garage.com",
      trangThai: "Tạm khóa",
      ngayTao: "2023-08-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tất cả vai trò");

  // --- Lọc nhân viên ---
  const filteredEmployees = employees.filter((e) => {
    const matchSearch = Object.values(e)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchRole =
      roleFilter === "Tất cả vai trò" || e.vaiTro === roleFilter;
    return matchSearch && matchRole;
  });

  // --- Cấu hình cột cho bảng ---
  const columns = [
    { key: "id", label: "Mã TK" },
    { key: "tenDangNhap", label: "Tên đăng nhập" },
    {
      key: "vaiTro",
      label: "Vai trò",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "trangThai",
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
    { key: "ngayTao", label: "Ngày tạo" },
  ];

  // --- Hành động ---
  const handleEdit = (row) => alert(`📝 Chỉnh sửa tài khoản: ${row.tenDangNhap}`);
  const handleLock = (row) => alert(`🔒 Khóa/Mở khóa tài khoản: ${row.tenDangNhap}`);

  return (
    <div className="space-y-6">
      {/* --- Header + nút thêm --- */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý nhân viên</h2>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} /> Thêm nhân viên mới
        </button>
      </div>

      {/* --- Thanh tìm kiếm & lọc --- */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1 flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm theo tên, email, vai trò..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          >
            <option>Tất cả vai trò</option>
            <option>Admin</option>
            <option>Nhân viên</option>
          </select>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
          Tìm kiếm
        </button>
      </div>

      {/* --- Bảng nhân viên tái sử dụng Table.jsx --- */}
      <Table
        columns={columns}
        data={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleLock} // tái sử dụng nút delete làm nút “Khóa”
      />
    </div>
  );
};

export default EmployeeManagement;
