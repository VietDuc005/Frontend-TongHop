import React, { useState, useEffect } from "react";
import ProductCard from "../components/common/ProductCard";
import SearchBar from "../components/common/SearchBar";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

const mockVehicles = [
  {
    id: 1,
    name: "Toyota Vios",
    details: "Biển số: 29A-12345 | Năm: 2019 | Màu: Trắng",
    description: "Chủ xe: Nguyễn Văn A",
    image: "https://placehold.co/400x250?text=Toyota+Vios",
  },
  {
    id: 2,
    name: "Honda Civic",
    details: "Biển số: 30B-67890 | Năm: 2021 | Màu: Đen",
    description: "Chủ xe: Trần Thị B",
    image: "https://placehold.co/400x250?text=Honda+Civic",
  },
  {
    id: 3,
    name: "Mazda CX-5",
    details: "Biển số: 31C-24680 | Năm: 2020 | Màu: Đỏ",
    description: "Chủ xe: Phạm Văn C",
    image: "https://placehold.co/400x250?text=Mazda+CX5",
  },
];

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => setVehicles(mockVehicles), []);

  const filtered = vehicles.filter((v) =>
    Object.values(v).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleView = (v) => setSelected(v);
  const handleEdit = (v) => alert(`✏️ Sửa xe: ${v.name}`);
  const handleDelete = (id) =>
    window.confirm("Xóa xe này?") &&
    setVehicles((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Phương tiện</h2>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} /> Thêm xe mới
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

      {/* Lưới xe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length ? (
          filtered.map((v) => (
            <ProductCard
              key={v.id}
              item={v}
              customActions={
                <>
                  <button
                    onClick={() => handleView(v)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(v)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="Sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              }
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            🚘 Không tìm thấy phương tiện nào.
          </p>
        )}
      </div>

      {/* Modal xem chi tiết */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] relative animate-fade-in">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold text-orange-500 mb-4">
              Thông tin phương tiện
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Tên xe:</strong> {selected.name}</p>
              <p><strong>{selected.details}</strong></p>
              <p><strong>{selected.description}</strong></p>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setSelected(null)}
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

export default VehicleManagement;
