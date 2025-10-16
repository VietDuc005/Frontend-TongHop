// src/pages/RepairManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { repairService } from "../services/repairService";
import { formatDate, formatCurrency } from "../utils/helpers";

const mockRepairs = [
  {
    id: 1,
    maPhieu: "RP001",
    bienSo: "30A-12345",
    tenKH: "Nguyễn Văn A",
    ngayLap: "2024-10-10",
    tenTho: "Lê Văn Hùng",
    trangThai: "Đang sửa",
    tongTien: 1200000,
  },
  {
    id: 2,
    maPhieu: "RP002",
    bienSo: "51B-67890",
    tenKH: "Trần Thị B",
    ngayLap: "2024-10-12",
    tenTho: "Nguyễn Văn Dũng",
    trangThai: "Hoàn thành",
    tongTien: 2500000,
  },
];

const getStatusColor = (value) => {
  if (value === "Hoàn thành") return "bg-green-100 text-green-800";
  if (value === "Đang sửa") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

const RepairManagement = () => {
  const [repairs, setRepairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      // const data = await repairService.getAll();
      const data = mockRepairs;
      setRepairs(data);
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
        // await repairService.delete(id);
        setRepairs(repairs.filter((r) => r.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const columns = [
    { key: "maPhieu", label: "Mã phiếu" },
    { key: "bienSo", label: "Biển số" },
    { key: "tenKH", label: "Khách hàng" },
    { key: "ngayLap", label: "Ngày lập", render: (value) => formatDate(value) },
    { key: "tenTho", label: "Thợ sửa" },
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
    {
      key: "tongTien",
      label: "Tổng tiền",
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Phiếu sửa chữa
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new repair")}
          placeholder="Tìm kiếm mã phiếu, biển số..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={repairs.filter((r) =>
          Object.values(r).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RepairManagement;
