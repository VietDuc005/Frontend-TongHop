import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { vehicleService } from "../services/vehicleService";
import Box from "../components/common/Box";

const VehicleManagement = () => {
  // ===================== STATE =====================
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit' | 'view'

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getAll();
      const list = response.content || response;

      const mapped = list.map((v) => ({
        id: v.maXe || v.id,
        bienSo: v.bienSo,
        hangXe: v.hangXe,
        dongXe: v.dongXe,
        namSanXuat: v.namSanXuat,
        mauSac: v.mauSac,
        tenKhachHang: v.tenKhachHang || "Không xác định",
        trangThai: "Đang hoạt động",
      }));

      setVehicles(mapped);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách xe:", err);
      setError("Không thể tải danh sách xe từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== HANDLERS =====================
  const handleView = (row) => {
    setModalMode("view");
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalMode("add");
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalMode("edit");
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa xe này không?")) {
      try {
        await vehicleService.remove(id);
        alert("Xóa thành công!");
        fetchData();
      } catch (err) {
        console.error("❌ Lỗi khi xóa xe:", err);
        setError("Xóa xe thất bại.");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === "edit") {
        await vehicleService.update(editingData.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await vehicleService.create(formData);
        alert("Thêm mới thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Lỗi khi lưu thông tin xe:", err);
      setError("Lưu thông tin thất bại.");
    }
  };

  // ===================== FILTER =====================
  const filtered = vehicles.filter((v) =>
    Object.values(v).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ===================== CONFIG =====================
  const columns = [
    { key: "bienSo", label: "Biển số" },
    { key: "hangXe", label: "Hãng xe" },
    { key: "dongXe", label: "Dòng xe" },
    { key: "namSanXuat", label: "Năm SX" },
    { key: "mauSac", label: "Màu sắc" },
    { key: "tenKhachHang", label: "Khách hàng" },
    { key: "trangThai", label: "Trạng thái" },
  ];

  const vehicleFields = [
    { name: "bienSo", label: "Biển số", type: "text" },
    { name: "hangXe", label: "Hãng xe", type: "text" },
    { name: "dongXe", label: "Dòng xe", type: "text" },
    { name: "namSanXuat", label: "Năm sản xuất", type: "number" },
    { name: "mauSac", label: "Màu sắc", type: "text" },
    { name: "maKhachHang", label: "Mã khách hàng", type: "number" },
  ];

  const getModalTitle = () => {
    if (modalMode === "view") return "Chi tiết Xe";
    if (modalMode === "edit") return "Chỉnh sửa Xe";
    return "Thêm Xe mới";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Phương tiện</h2>
        <button
          onClick={handleAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Thêm xe
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo biển số, hãng xe, chủ xe..."
        />
      </div>

      {/* Hiển thị lỗi */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        data={filtered}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
      />

      {/* Modal chung Box */}
      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={vehicleFields}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default VehicleManagement;
