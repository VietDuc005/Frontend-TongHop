// src/pages/VehicleManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { vehicleService } from "../services/vehicleService"; // mock service

// Mock service tạm thời nếu chưa có backend
// (Bạn có thể xóa đoạn này khi có file vehicleService.js thật)
const mockVehicles = [
  { id: 1, bienSo: "29A-12345", hangXe: "Toyota", dongXe: "Vios", namSanXuat: 2019, mauSac: "Trắng", tenKH: "Nguyễn Văn A" },
  { id: 2, bienSo: "30B-67890", hangXe: "Honda", dongXe: "Civic", namSanXuat: 2021, mauSac: "Đen", tenKH: "Trần Thị B" },
  { id: 3, bienSo: "31C-24680", hangXe: "Mazda", dongXe: "CX-5", namSanXuat: 2020, mauSac: "Đỏ", tenKH: "Phạm Văn C" },
];

export const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // nếu chưa có backend → dùng mock data
    const fetchData = async () => {
      try {
        // const data = await vehicleService.getAll(); // thật
        const data = mockVehicles; // giả lập
        setVehicles(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        // await vehicleService.delete(id); // thật
        setVehicles(vehicles.filter((v) => v.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (vehicle) => {
    console.log("Edit vehicle:", vehicle);
  };

  const columns = [
    { key: "bienSo", label: "Biển số" },
    { key: "hangXe", label: "Hãng xe" },
    { key: "dongXe", label: "Dòng xe" },
    { key: "namSanXuat", label: "Năm SX" },
    { key: "mauSac", label: "Màu sắc" },
    { key: "tenKH", label: "Chủ xe" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quản lý xe
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new vehicle")}
          placeholder="Tìm kiếm biển số, hãng xe..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={vehicles.filter((v) =>
          Object.values(v).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

// ✅ Quan trọng: thêm export default để React nhận đúng component
export default VehicleManagement;
