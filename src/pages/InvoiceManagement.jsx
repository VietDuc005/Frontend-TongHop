// src/pages/InvoiceManagement.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { invoiceService } from "../services/invoiceService";
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
];

const getStatusColor = (value) => {
  return value === "Đã thanh toán"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      // const data = await invoiceService.getAll();
      const data = mockInvoices;
      setInvoices(data);
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
        // await invoiceService.delete(id);
        setInvoices(invoices.filter((i) => i.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const columns = [
    { key: "maHD", label: "Mã HĐ" },
    { key: "maPhieu", label: "Mã phiếu" },
    { key: "ngayLap", label: "Ngày lập", render: (value) => formatDate(value) },
    { key: "kieuThanhToan", label: "Thanh toán" },
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hóa đơn</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => console.log("Add new invoice")}
          placeholder="Tìm kiếm mã HĐ..."
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <Table
        columns={columns}
        data={invoices.filter((i) =>
          Object.values(i).some((val) =>
            val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InvoiceManagement;
