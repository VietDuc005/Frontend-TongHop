// src/pages/CustomerManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { customerService } from "../services/customerService";

const mockCustomers = [
  {
    id: 1,
    tenKH: "Nguyễn Văn A",
    soDienThoai: "0901234567",
    email: "nguyenvana@email.com",
    diaChi: "Hà Nội",
    loaiKhach: "VIP",
  },
  {
    id: 2,
    tenKH: "Trần Thị B",
    soDienThoai: "0912345678",
    email: "tranthib@email.com",
    diaChi: "TP.HCM",
    loaiKhach: "Thường",
  },
];

const getStatusColor = (value) => {
  return value === "VIP"
    ? "bg-yellow-100 text-yellow-800"
    : "bg-gray-100 text-gray-800";
};

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // const data = await customerService.getAll();
      const data = mockCustomers;
      setCustomers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        // await customerService.delete(id);
        setCustomers(customers.filter((c) => c.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const columns = [
    { key: "tenKH", label: "Tên khách hàng" },
    { key: "soDienThoai", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    { key: "diaChi", label: "Địa chỉ" },
    {
      key: "loaiKhach",
      label: "Loại khách",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
            value
          )}`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quản lý khách hàng
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new customer")}
          placeholder="Tìm kiếm tên, SĐT, email..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={customers.filter((c) =>
          Object.values(c).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CustomerManagement;
