import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import Box from "../components/common/Box";
import { invoiceService } from "../services/invoiceService";
import { formatDate, formatCurrency } from "../utils/helpers";

// 🎨 Màu trạng thái hiển thị
const getStatusColor = (status) => {
  switch (status) {
    case "Đã thanh toán":
      return "bg-green-100 text-green-800";
    case "Chưa thanh toán":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const InvoiceManagement = () => {
  // ===================== STATE =====================
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // ===================== FETCH DATA =====================
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const list = await invoiceService.getAll(); // ✅ service trả về content đã chuẩn hóa

      const mapped = list.map((item, index) => ({
        id: item.maHoaDon || index,
        maHoaDon: item.maHoaDon,
        maPhieu: item.maPhieu,
        ngayLap: item.ngayLapHoaDon,
        thoiGianThanhCong: item.thoiGianThanhCong,
        kieuThanhToan: item.kieuThanhToan || "Chưa xác định",
        trangThai: item.trangThai || "Chưa thanh toán",
        tongTien: item.tongTien || 0,
        chiTietList: item.chiTietList || [], // ✅ thêm trường chi tiết để xem trong modal
      }));

      setInvoices(mapped);
      setError("");
    } catch (err) {
      console.error("❌ Lỗi tải danh sách hóa đơn:", err);
      setError("Không thể tải danh sách hóa đơn từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ===================== HANDLERS =====================
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

  const handleSave = async (formData) => {
    try {
      await invoiceService.updateStatus(editingData.maHoaDon, formData.trangThai);
      await invoiceService.updatePaymentType(
        editingData.maHoaDon,
        formData.kieuThanhToan
      );
      alert("✅ Cập nhật hóa đơn thành công!");
      setIsModalOpen(false);
      fetchInvoices();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật hóa đơn:", err);
      setError("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  // ===================== FILTER =====================
  const filteredInvoices = invoices.filter((i) =>
    Object.values(i).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ===================== TABLE CONFIG =====================
  const columns = [
    { key: "maHoaDon", label: "Mã HĐ" },
    { key: "maPhieu", label: "Mã Phiếu" },
    {
      key: "ngayLap",
      label: "Ngày Lập",
      render: (value) => (value ? formatDate(value) : "—"),
    },
    {
      key: "kieuThanhToan",
      label: "Hình Thức TT",
      render: (value) => value || "—",
    },
    {
      key: "trangThai",
      label: "Trạng Thái",
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
      label: "Tổng Tiền",
      render: (value) => (
        <span className="font-semibold text-gray-800">
          {formatCurrency(value)}
        </span>
      ),
    },
  ];

  // ===================== FORM CONFIG =====================
  const invoiceFields = [
    {
      name: "kieuThanhToan",
      label: "Hình thức thanh toán",
      type: "select",
      options: ["Tiền mặt", "Thẻ", "Chuyển khoản"],
    },
    {
      name: "trangThai",
      label: "Trạng thái",
      type: "select",
      options: ["Đã thanh toán", "Chưa thanh toán"],
    },
  ];

  const getModalTitle = () => {
    if (modalMode === "edit") return "Cập nhật Hóa đơn";
    return "Chi tiết Hóa đơn";
  };

  // ===================== UI =====================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Hóa đơn</h2>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo mã HĐ, mã phiếu, trạng thái..."
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
        data={filteredInvoices}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
      />

      {/* Modal (Box) */}
      {isModalOpen && (
        <Box
          mode={modalMode}
          title={getModalTitle()}
          fields={invoiceFields}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        >
          {/* ✅ Hiển thị danh sách chi tiết dịch vụ trong modal (nếu có) */}
          {editingData?.chiTietList?.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2 text-gray-700">Chi tiết dịch vụ:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {editingData.chiTietList.map((ct, idx) => (
                  <li key={idx}>
                    - {ct.tenDichVu} (x{ct.soLuong}) —{" "}
                    {formatCurrency(ct.thanhTien)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Box>
      )}
    </div>
  );
};

export default InvoiceManagement;
