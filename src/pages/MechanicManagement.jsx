import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import Box from "../components/common/Box";
import { mechanicService } from "../services/mechanicService";

const MechanicManagement = () => {
  // ===================== STATE =====================
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'

  // ===================== DATA FETCHING =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await mechanicService.getAll();
      // Chuẩn hóa dữ liệu trả về từ API, đảm bảo mỗi item đều có 'id'
      const list = (response.content || response).map(item => ({
        ...item,
        id: item.maTho || item.id, // Tạo một key 'id' chung để dễ xử lý
      }));
      setMechanics(list);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách thợ:", err);
      setError("Không thể tải danh sách thợ từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== HANDLERS =====================
  const handleView = (row) => {
    setModalMode('view');
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalMode('add');
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalMode('edit');
    setEditingData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Lỗi: Không tìm thấy ID của thợ.");
      return;
    }
    if (window.confirm("Bạn có chắc muốn xóa thợ này không?")) {
      try {
        await mechanicService.remove(id);
        alert("Xóa thành công!");
        fetchData(); // Tải lại dữ liệu
      } catch (err) {
        console.error("❌ Lỗi khi xóa thợ:", err);
        setError("Xóa thợ thất bại.");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === 'edit') {
        await mechanicService.update(editingData.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await mechanicService.create(formData);
        alert("Thêm mới thành công!");
      }
      setIsModalOpen(false);
      fetchData(); // Tải lại dữ liệu
    } catch (err) {
      console.error("❌ Lỗi khi lưu thông tin thợ:", err);
      setError("Lưu thông tin thất bại.");
    }
  };

  // ===================== CONFIGS & FILTERING =====================
  
  // Định nghĩa các trường cho form trong Box.jsx dựa trên API
  const mechanicFields = [
    { name: 'tenTho', label: 'Tên thợ', type: 'text' },
    { name: 'chuyenMon', label: 'Chuyên môn', type: 'text' },
    { name: 'soDienThoai', label: 'Số điện thoại', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'kinhNghiem', label: 'Số năm kinh nghiệm', type: 'number', defaultValue: 0 },
  ];

  // Định nghĩa các cột cho Table
  const columns = [
    { key: "tenTho", label: "Tên Thợ" },
    { key: "chuyenMon", label: "Chuyên Môn" },
    { key: "soDienThoai", label: "Số Điện Thoại" },
    { key: "email", label: "Email" },
    { key: "kinhNghiem", label: "Kinh Nghiệm (năm)" },
  ];

  const filteredData = mechanics.filter(m =>
    m.tenTho && m.tenTho.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getModalTitle = () => {
    if (modalMode === 'view') return "Chi tiết Thợ";
    if (modalMode === 'edit') return "Chỉnh sửa Thông tin Thợ";
    return "Thêm Thợ mới";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Thợ</h2>
        <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          + Thêm thợ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Tìm theo tên thợ..." />
      </div>

      {error && <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm">{error}</div>}

      <Table
        columns={columns}
        data={filteredData}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        // Sử dụng ID đã được chuẩn hóa
        onDelete={(row) => handleDelete(row.id)}
      />

      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={mechanicFields}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
};

export default MechanicManagement;