import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import Box from "../components/common/Box"; // dùng modal form chung
import { Plus } from "lucide-react";
import { repairService } from "../services/repairService";
import { formatDate, formatCurrency } from "../utils/helpers";

// 🌈 màu trạng thái
const getStatusColor = (value) => {
  if (value === "Hoàn thành") return "bg-green-100 text-green-800";
  if (value === "Đang sửa") return "bg-yellow-100 text-yellow-800";
  if (value === "Đã hủy") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-800";
};

const RepairManagement = () => {
  // ===================== STATE =====================
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // add | edit | view

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await repairService.getAll();
      const list = response.content || response;

      const mapped = list.map((item, index) => ({
        id: item.maPhieu || index,
        maPhieu: item.maPhieu,
        bienSo: item.bienSo || "Không rõ",
        tenKH: item.tenKhachHang || "Không rõ",
        ngayLap: item.ngayLap || item.ngayTao || null,
        tenTho: item.tenTho || "Chưa phân công",
        trangThai: item.trangThai || "Đang xử lý",
        tongTien: item.tongTien || 0,
      }));
      setRepairs(mapped);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách phiếu:", err);
      setError("Không thể tải danh sách phiếu sửa chữa từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== HANDLERS =====================
  const handleAdd = () => {
    setModalMode("add");
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleView = (row) => {
    setModalMode("view");
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalMode("edit");
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("Không tìm thấy mã phiếu.");
    if (window.confirm("Bạn có chắc muốn xóa phiếu này không?")) {
      try {
        await repairService.remove(id);
        alert("Xóa thành công!");
        fetchData();
      } catch (err) {
        console.error("❌ Lỗi khi xóa phiếu:", err);
        setError("Xóa phiếu thất bại.");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === "edit") {
        await repairService.update(editingData.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await repairService.create(formData);
        alert("Thêm mới thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Lỗi khi lưu phiếu:", err);
      setError("Lưu thông tin thất bại.");
    }
  };

  // ===================== CONFIG =====================
  const columns = [
    { key: "maPhieu", label: "Mã phiếu" },
    { key: "bienSo", label: "Biển số" },
    { key: "tenKH", label: "Khách hàng" },
    {
      key: "ngayLap",
      label: "Ngày lập",
      render: (value) => (value ? formatDate(value) : "—"),
    },
    { key: "tenTho", label: "Thợ sửa" },
    {
      key: "trangThai",
      label: "Trạng thái",
      render: (value) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
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
      render: (value) => formatCurrency(value || 0),
    },
  ];

  const repairFields = [
    { name: "maXe", label: "Mã xe", type: "number" },
    { name: "maTho", label: "Mã thợ", type: "number" },
    { name: "bienSo", label: "Biển số", type: "text" },
    { name: "tenTho", label: "Tên thợ", type: "text" },
    { name: "moTa", label: "Mô tả", type: "textarea" },
    {
      name: "chiTietList",
      label: "Danh sách dịch vụ (JSON)",
      type: "textarea",
      placeholder: '[{ "maDichVu": 1, "soLuong": 1 }]',
    },
  ];

  const getModalTitle = () => {
    if (modalMode === "view") return "Chi tiết Phiếu sửa chữa";
    if (modalMode === "edit") return "Chỉnh sửa Phiếu sửa chữa";
    return "Thêm Phiếu sửa chữa mới";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Phiếu sửa chữa</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} /> Thêm phiếu sửa chữa
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm kiếm mã phiếu, biển số, khách hàng..."
        />
      </div>

      {/* Lỗi */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        data={repairs.filter((r) =>
          Object.values(r).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
      />

      {/* Modal dùng chung */}
      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={repairFields}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default RepairManagement;
