import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import Box from "../components/common/Box";
import { Plus } from "lucide-react";
import { customerService } from "../services/customerService";

const CustomerManagement = () => {
  // ===================== STATE =====================
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit' | 'view'

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customerService.getAll();
      const list = response.content || response;

      const mapped = list.map((c) => ({
        id: c.maKhachHang || c.id,
        tenKhachHang: c.tenKhachHang,
        soDienThoai: c.soDienThoai,
        email: c.email,
        diaChi: c.diaChi,
        loaiKhach: c.loaiKhach || "Cá nhân",
        ghiChu: c.ghiChu || "",
        status: c.trangThai || "Hoạt động",
      }));

      setCustomers(mapped);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách khách hàng:", err);
      setError("Không thể tải danh sách khách hàng từ server.");
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
    if (!id) return alert("Lỗi: Không tìm thấy ID khách hàng.");
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này không?")) {
      try {
        await customerService.remove(id);
        alert("Xóa thành công!");
        fetchData();
      } catch (err) {
        console.error("❌ Lỗi khi xóa khách hàng:", err);
        setError("Xóa khách hàng thất bại.");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === "edit") {
        await customerService.update(editingData.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await customerService.create(formData);
        alert("Thêm mới thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Lỗi khi lưu khách hàng:", err);
      setError("Lưu thông tin thất bại.");
    }
  };

  // ===================== FILTERING =====================
  const filtered = customers.filter((c) => {
    const matchSearch =
      c.tenKhachHang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.soDienThoai?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "Tất cả trạng thái" || c.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // ===================== CONFIG =====================
  const columns = [
    {
      key: "tenKhachHang",
      label: "Khách hàng",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{value}</span>
          <span className="text-xs text-gray-500">{row.id}</span>
        </div>
      ),
    },
    {
      key: "soDienThoai",
      label: "Liên hệ",
      render: (value, row) => (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>{row.soDienThoai}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>✉️</span>
            <span>{row.email}</span>
          </div>
        </div>
      ),
    },
    { key: "diaChi", label: "Địa chỉ" },
    {
      key: "status",
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
  ];

  const customerFields = [
    { name: "tenKhachHang", label: "Tên khách hàng", type: "text" },
    { name: "soDienThoai", label: "Số điện thoại", type: "tel" },
    { name: "email", label: "Email", type: "email" },
    { name: "diaChi", label: "Địa chỉ", type: "text" },
    {
      name: "loaiKhach",
      label: "Loại khách",
      type: "select",
      options: ["Cá nhân", "Doanh nghiệp"],
    },
    { name: "ghiChu", label: "Ghi chú", type: "textarea" },
  ];

  const getModalTitle = () => {
    if (modalMode === "view") return "Chi tiết Khách hàng";
    if (modalMode === "edit") return "Chỉnh sửa Khách hàng";
    return "Thêm Khách hàng mới";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Khách hàng</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} /> Thêm khách hàng
        </button>
      </div>

      {/* Bộ lọc & tìm kiếm */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo tên, SĐT, email..."
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        >
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Dừng hoạt động</option>
        </select>
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

      {/* Modal Box (dùng chung) */}
      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={customerFields}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default CustomerManagement;
