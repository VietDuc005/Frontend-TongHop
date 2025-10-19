import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { formatDate, formatCurrency } from "../utils/helpers";

const mockInvoices = [
  {
    id: 1,
    maHD: "HD001",
    maPhieu: "PC001",
    ngayLap: "2024-10-10",
    kieuThanhToan: "Tiền mặt",
    trangThai: "Đã thanh toán",
    tongTien: 1500000,
  },
  {
    id: 2,
    maHD: "HD002",
    maPhieu: "PC002",
    ngayLap: "2024-10-11",
    kieuThanhToan: "Chuyển khoản",
    trangThai: "Chưa thanh toán",
    tongTien: 2300000,
  },
  {
    id: 3,
    maHD: "HD003",
    maPhieu: "PC003",
    ngayLap: "2024-10-12",
    kieuThanhToan: "Thẻ ngân hàng",
    trangThai: "Đã thanh toán",
    tongTien: 4500000,
  },
];

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
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      // const data = await invoiceService.getAll();
      const data = mockInvoices;
      setInvoices(data);
    } catch (err) {
      setError("Không thể tải dữ liệu hóa đơn.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hóa đơn này không?")) {
      setInvoices((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleView = (row) => {
    setSelectedInvoice(row); // ✅ mở modal chi tiết
  };

  const handleEdit = (row) => alert(`✏️ Sửa hóa đơn: ${row.maHD}`);
  const closeModal = () => setSelectedInvoice(null);

  const filteredInvoices = invoices.filter((i) =>
    Object.values(i).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { key: "maHD", label: "Mã HĐ" },
    { key: "maPhieu", label: "Mã phiếu" },
    {
      key: "ngayLap",
      label: "Ngày lập",
      render: (value) => formatDate(value),
    },
    { key: "kieuThanhToan", label: "Hình thức TT" },
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
      render: (value) => (
        <span className="font-semibold text-gray-800">
          {formatCurrency(value)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Hóa đơn</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          + Thêm hóa đơn mới
        </button>
      </div>

      {/* --- Thanh tìm kiếm --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo mã HĐ, mã phiếu, trạng thái..."
        />
      </div>

      {/* --- Thông báo lỗi --- */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* --- Bảng hóa đơn --- */}
      <Table
        columns={columns}
        data={filteredInvoices}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* --- Modal xem chi tiết --- */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] relative animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-orange-500 mb-4">
              Chi tiết hóa đơn
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Mã HĐ:</strong> {selectedInvoice.maHD}
              </p>
              <p>
                <strong>Mã phiếu:</strong> {selectedInvoice.maPhieu}
              </p>
              <p>
                <strong>Ngày lập:</strong>{" "}
                {formatDate(selectedInvoice.ngayLap)}
              </p>
              <p>
                <strong>Hình thức thanh toán:</strong>{" "}
                {selectedInvoice.kieuThanhToan}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                    selectedInvoice.trangThai
                  )}`}
                >
                  {selectedInvoice.trangThai}
                </span>
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                <span className="font-semibold text-gray-900">
                  {formatCurrency(selectedInvoice.tongTien)}
                </span>
              </p>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={closeModal}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;
