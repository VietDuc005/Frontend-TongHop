// src/pages/ServiceManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { serviceService } from "../services/serviceService";
import { formatCurrency } from "../utils/helpers";

const mockServices = [
  {
    id: 1,
    tenDV: "Thay dầu động cơ",
    loaiDV: "Bảo dưỡng",
    gia: 350000,
    soLuongTon: 10,
    soLuongBan: 25,
    thoiGian: "30 phút",
  },
  {
    id: 2,
    tenDV: "Sửa hệ thống phanh",
    loaiDV: "Sửa chữa",
    gia: 1200000,
    soLuongTon: 5,
    soLuongBan: 18,
    thoiGian: "1 giờ 15 phút",
  },
];

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // const data = await serviceService.getAll();
      const data = mockServices;
      setServices(data);
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
        // await serviceService.delete(id);
        setServices(services.filter((s) => s.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const columns = [
    { key: "tenDV", label: "Tên dịch vụ" },
    { key: "loaiDV", label: "Loại DV" },
    { key: "gia", label: "Giá", render: (value) => formatCurrency(value) },
    { key: "soLuongTon", label: "Tồn kho" },
    { key: "soLuongBan", label: "Đã bán" },
    { key: "thoiGian", label: "Thời gian" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quản lý dịch vụ
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new service")}
          placeholder="Tìm kiếm dịch vụ..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={services.filter((s) =>
          Object.values(s).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ServiceManagement;
