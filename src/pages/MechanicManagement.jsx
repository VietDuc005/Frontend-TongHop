import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import SearchBar from "../components/common/SearchBar";
import { formatCurrency } from "../utils/helpers";

// ✅ Dữ liệu giả lập (demo)
const mockMechanics = [
  {
    id: 1,
    maTho: "T001",
    hoTen: "Nguyễn Văn A",
    sdt: "0901 234 567",
    chuyenMon: "Sửa máy - điện",
    trangThai: "Đang làm việc",
    luong: 12000000,
  },
  {
    id: 2,
    maTho: "T002",
    hoTen: "Trần Văn B",
    sdt: "0912 345 678",
    chuyenMon: "Bảo dưỡng - thay dầu",
    trangThai: "Tạm nghỉ",
    luong: 9500000,
  },
  {
    id: 3,
    maTho: "T003",
    hoTen: "Phạm Văn C",
    sdt: "0934 567 890",
    chuyenMon: "Sơn - gò hàn",
    trangThai: "Đang làm việc",
    luong: 11000000,
  },
];

// ✅ Hàm đổi màu theo trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "Đang làm việc":
      return "bg-green-100 text-green-700";
    case "Tạm nghỉ":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const MechanicManagement = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = async () => {
    try {
      // const data = await mechanicService.getAll();
      const data = mockMechanics;
      setMechanics(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu thợ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thợ này không?")) {
      setMechanics((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleView = (row) => setSelectedMechanic(row);
  const handleEdit = (row) => alert(`✏️ Sửa thông tin thợ: ${row.hoTen}`);
  const closeModal = () => setSelectedMechanic(null);

  const filteredMechanics = mechanics.filter((m) =>
    Object.values(m).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { key: "maTho", label: "Mã thợ" },
    { key: "hoTen", label: "Họ tên" },
    { key: "sdt", label: "Số điện thoại" },
    { key: "chuyenMon", label: "Chuyên môn" },
    {
      key: "trangThai",
      label: "Trạng thái",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "luong",
      label: "Lương (VNĐ)",
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
        <h2 className="text-xl font-bold text-gray-800">Quản lý Thợ sửa xe</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          + Thêm thợ mới
        </button>
      </div>

      {/* --- Thanh tìm kiếm --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Tìm theo tên, mã thợ, chuyên môn..."
        />
      </div>

      {/* --- Bảng dữ liệu --- */}
      <Table
        columns={columns}
        data={filteredMechanics}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* --- Modal xem chi tiết --- */}
      {selectedMechanic && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] relative animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-orange-500 mb-4">
              Thông tin chi tiết thợ
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Mã thợ:</strong> {selectedMechanic.maTho}</p>
              <p><strong>Họ tên:</strong> {selectedMechanic.hoTen}</p>
              <p><strong>Số điện thoại:</strong> {selectedMechanic.sdt}</p>
              <p><strong>Chuyên môn:</strong> {selectedMechanic.chuyenMon}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                    selectedMechanic.trangThai
                  )}`}
                >
                  {selectedMechanic.trangThai}
                </span>
              </p>
              <p>
                <strong>Lương:</strong>{" "}
                <span className="font-semibold text-gray-900">
                  {formatCurrency(selectedMechanic.luong)}
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

export default MechanicManagement;
