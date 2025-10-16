import React from "react";
import Table from "../components/common/Table"; // Đường dẫn tới component TableView
import { toMillions, fmtDate } from "../utils/helpers"; // (nếu bạn có helper riêng)

const EmployeeManagement = () => {
  // ======= Dữ liệu mẫu =======
  const employees = [
    { maTK: "TK001", tenDangNhap: "admin", vaiTro: "Admin", email: "admin@garage.com", trangThai: "Hoạt động", ngayTao: "2023-01-01" },
    { maTK: "TK002", tenDangNhap: "nhanvien1", vaiTro: "Nhân viên", email: "nv1@garage.com", trangThai: "Hoạt động", ngayTao: "2023-03-15" },
    { maTK: "TK003", tenDangNhap: "nhanvien2", vaiTro: "Nhân viên", email: "nv2@garage.com", trangThai: "Hoạt động", ngayTao: "2023-06-20" },
    { maTK: "TK004", tenDangNhap: "nhanvien3", vaiTro: "Nhân viên", email: "nv3@garage.com", trangThai: "Tạm khóa", ngayTao: "2023-08-10" },
  ];

  // ======= Cấu hình cột =======
  const columns = [
    { key: "maTK", label: "Mã TK" },
    { key: "tenDangNhap", label: "Tên đăng nhập" },
    {
      key: "vaiTro",
      label: "Vai trò",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
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
          className={`px-2 py-1 rounded text-xs font-semibold ${
            value === "Hoạt động"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "ngayTao", label: "Ngày tạo" },
  ];

  // ======= Render giao diện =======
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Quản lý nhân viên
      </h2>
      <Table
        title="Danh sách nhân viên"
        data={employees}
        columns={columns}
        searchableKeys={["maTK", "tenDangNhap", "email", "vaiTro", "trangThai"]}
      />
    </div>
  );
};

export default EmployeeManagement;
