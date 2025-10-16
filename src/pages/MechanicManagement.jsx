// src/pages/MechanicManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { mechanicService } from "../services/mechanicService";

const mockMechanics = [
  {
    id: 1,
    tenTho: "Lê Văn Hùng",
    chuyenMon: "Sửa động cơ",
    soDienThoai: "0905123456",
    kinhNghiem: "5 năm",
    trangThai: "Đang làm việc",
  },
  {
    id: 2,
    tenTho: "Nguyễn Văn Dũng",
    chuyenMon: "Điện - điện tử ô tô",
    soDienThoai: "0912345678",
    kinhNghiem: "3 năm",
    trangThai: "Tạm nghỉ",
  },
];

const getStatusColor = (value) => {
  return value === "Đang làm việc"
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";
};

const MechanicManagement = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      // const data = await mechanicService.getAll();
      const data = mockMechanics;
      setMechanics(data);
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
        // await mechanicService.delete(id);
        setMechanics(mechanics.filter((m) => m.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const columns = [
    { key: "tenTho", label: "Tên thợ" },
    { key: "chuyenMon", label: "Chuyên môn" },
    { key: "soDienThoai", label: "Số điện thoại" },
    { key: "kinhNghiem", label: "Kinh nghiệm" },
    {
      key: "trangThai",
      label: "Trạng thái",
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
          Quản lý thợ sửa xe
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new mechanic")}
          placeholder="Tìm kiếm tên, chuyên môn..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={mechanics.filter((m) =>
          Object.values(m).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MechanicManagement;
