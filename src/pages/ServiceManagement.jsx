import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import Box from "../components/common/Box";
import { serviceService } from "../services/serviceService";
import { formatCurrency } from "../utils/helpers";

const ServiceManagement = () => {
  // ===================== STATE =====================
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll();
      const list = response.content || [];

      const mapped = list.map((d) => ({
        id: d.maDichVu,
        tenDichVu: d.tenDichVu || "Chưa có tên",
        moTa: d.moTa || "Không có mô tả",
        anhDichVu: d.anhDichVu,
        soLuongTon: d.soLuongTon ?? 0,
        soLuongBan: d.soLuongBan ?? 0,
        gia: d.gia ?? 0,
        thoiGianUocTinh: d.thoiGianUocTinh ?? 0,
        trangThai: d.trangThai || "Đang hoạt động",
        ngayTao: d.ngayTao ? new Date(d.ngayTao).toLocaleDateString("vi-VN") : "",
        loai: d.tenLoaiDichVu || "Khác",
      }));

      setServices(mapped);
      setError("");
    } catch (err) {
      console.error("❌ Lỗi tải danh sách dịch vụ:", err);
      setError("Không thể tải danh sách dịch vụ từ server.");
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
    setEditingService(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalMode("add");
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalMode("edit");
    setEditingService(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này không?")) {
      try {
        await serviceService.remove(id);
        alert("🗑️ Xóa dịch vụ thành công!");
        fetchData();
      } catch (err) {
        console.error("❌ Lỗi khi xóa dịch vụ:", err);
        setError("Không thể xóa dịch vụ. Vui lòng thử lại.");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === "edit") {
        await serviceService.update(editingService.id, formData);
        alert("✏️ Cập nhật dịch vụ thành công!");
      } else {
        await serviceService.create(formData);
        alert("✅ Thêm dịch vụ mới thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Lỗi khi lưu dịch vụ:", err);
      setError("Lưu dịch vụ thất bại. Kiểm tra dữ liệu đầu vào!");
    }
  };

  // ===================== FILTERING =====================
  const filtered = services.filter((s) =>
    (s.tenDichVu || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===================== TABLE CONFIG =====================
  const columns = [
    { key: "tenDichVu", label: "Tên dịch vụ" },
    {
      key: "anhDichVu",
      label: "Ảnh",
      render: (value) =>
        value ? (
          <img
            src={value}
            alt="Ảnh dịch vụ"
            className="w-14 h-14 object-cover rounded-lg border"
          />
        ) : (
          <span className="text-gray-400 italic">Không có ảnh</span>
        ),
    },
    { key: "loai", label: "Loại dịch vụ" },
    { key: "soLuongTon", label: "Tồn kho" },
    { key: "soLuongBan", label: "Đã bán" },
    {
      key: "gia",
      label: "Giá (VNĐ)",
      render: (value) => formatCurrency(value),
    },
    { key: "thoiGianUocTinh", label: "Ước tính (phút)" },
    {
      key: "trangThai",
      label: "Trạng thái",
      render: (value) => {
        const color =
          value === "Ngừng kinh doanh"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700";
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${color}`}
          >
            {value}
          </span>
        );
      },
    },
    { key: "ngayTao", label: "Ngày tạo" },
  ];

  // ===================== FORM FIELDS =====================
  const serviceFields = [
    { name: "tenDichVu", label: "Tên dịch vụ", type: "text" },
    { name: "moTa", label: "Mô tả", type: "textarea" },
    { name: "gia", label: "Giá (VNĐ)", type: "number" },
    { name: "soLuongTon", label: "Số lượng tồn", type: "number" },
    { name: "soLuongBan", label: "Số lượng bán", type: "number" },
    { name: "thoiGianUocTinh", label: "Thời gian ước tính (phút)", type: "number" },
    { name: "loai", label: "Loại dịch vụ", type: "text" },
    { name: "anhDichVu", label: "URL Ảnh", type: "text" },
    { name: "trangThai", label: "Trạng thái", type: "text" },
  ];

  const getModalTitle = () => {
    if (modalMode === "view") return "Chi tiết Dịch vụ";
    if (modalMode === "edit") return "Chỉnh sửa Dịch vụ";
    return "Thêm Dịch vụ mới";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Dịch vụ</h2>
        <button
          onClick={handleAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Thêm Dịch vụ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo tên dịch vụ..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={filtered}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={serviceFields}
          initialData={editingService}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
