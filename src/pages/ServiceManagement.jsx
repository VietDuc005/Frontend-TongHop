import React, { useState, useEffect } from "react";
import ProductCard from "../components/common/ProductCard";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

// ✅ Mock dữ liệu dịch vụ
const mockServices = [
  {
    id: 1,
    name: "Thay dầu động cơ",
    category: "Bảo dưỡng",
    price: 350000,
    time: "30 phút",
    status: "Đang hoạt động",
    image: "https://placehold.co/400x250?text=Thay+dầu+động+cơ",
  },
  {
    id: 2,
    name: "Sửa hệ thống phanh",
    category: "Sửa chữa",
    price: 1200000,
    time: "1 giờ 15 phút",
    status: "Đang hoạt động",
    image: "https://placehold.co/400x250?text=Sửa+phanh",
  },
  {
    id: 3,
    name: "Thay lốp xe",
    category: "Thay thế",
    price: 800000,
    time: "45 phút",
    status: "Tạm dừng",
    image: "https://placehold.co/400x250?text=Thay+lốp+xe",
  },
];


const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const handleEdit = (service) =>
    alert(`✏️ Chỉnh sửa dịch vụ: ${service.name}`);
  const handleView = (service) =>
    alert(
      `📋 Thông tin dịch vụ:\n- Tên: ${service.name}\n- Thời gian: ${service.time}\n- Giá: ${formatCurrency(
        service.price
      )}`
    );
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này không?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Lọc dịch vụ theo tìm kiếm và trạng thái
  const filtered = services.filter((s) => {
    const matchSearch = Object.values(s)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "Tất cả trạng thái" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Dịch vụ</h2>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} /> Thêm Dịch vụ mới
        </button>
      </div>

      {/* Thanh tìm kiếm + lọc */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1 flex items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Tìm theo tên, loại dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          >
            <option>Tất cả trạng thái</option>
            <option>Đang hoạt động</option>
            <option>Tạm dừng</option>
          </select>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
          Tìm kiếm
        </button>
      </div>

      {/* Danh sách thẻ dịch vụ */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <ProductCard
              key={s.id}
              item={{
                ...s,
                description: `${s.category} • ${s.time}`,
                details: `${formatCurrency(s.price)} • ${s.status}`,
              }}
              customActions={
                <>
                  <button
                    onClick={() => handleView(s)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(s)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="Sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              }
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 italic mt-6">
            Không tìm thấy dịch vụ nào phù hợp.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceManagement;
