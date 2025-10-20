// src/pages/SalesManagement.jsx
import React, { useState, useEffect } from "react";
import OrderSidebar from "../components/layout/OrderSidebar";
import ProductCard from "../components/common/ProductCard";
import { Search, Filter } from "lucide-react";
import { serviceService } from "../services/serviceService"; // ✅ LẤY DỮ LIỆU TỪ /api/dichvu
import { formatCurrency } from "../utils/helpers";

const SalesManagement = () => {
  // ===================== STATE =====================
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll(); // ✅ /api/dichvu/hienThiDanhSach
      const list = response.content || [];

      const mapped = list.map((item) => ({
        id: item.maDichVu,
        name: item.tenDichVu || "Không có tên dịch vụ",
        category: item.tenLoaiDichVu || "Khác",
        price: item.gia || 0,
        description: item.moTa || "Không có mô tả chi tiết.",
        image: item.anhDichVu || null, // ✅ NULL nếu không có ảnh
        status: item.trangThai || "Không rõ",
        time: item.thoiGianUocTinh || 0,
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

  // ===================== CART HANDLERS =====================
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemove = (id) => setCart(cart.filter((i) => i.id !== id));

  const handleCheckout = () => {
    alert("💰 Thanh toán thành công (demo). Dữ liệu có thể được gửi lên server sau này!");
    setCart([]);
  };

  // ===================== FILTERING =====================
  const uniqueCategories = [
    "Tất cả",
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ];

  const filtered = services.filter((s) => {
    const matchCategory =
      selectedCategory === "Tất cả" || s.category === selectedCategory;
    const matchSearch = (s.name || "")
      .toLowerCase()
      .includes((search || "").toLowerCase());
    return matchCategory && matchSearch;
  });

  // ===================== UI =====================
  return (
    <div className="flex">
      {/* --- KHU VỰC SẢN PHẨM --- */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* === Thanh tìm kiếm & lọc === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          {/* Ô tìm kiếm */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Danh mục + lọc nâng cao */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-600 hover:bg-orange-50 transition">
              <Filter size={18} />
              <span className="text-sm font-medium">Lọc nâng cao</span>
            </button>
          </div>
        </div>

        {/* === Hiển thị lỗi === */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">{error}</div>
        )}

        {/* === Lưới sản phẩm === */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Đang tải dữ liệu...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <ProductCard
                  key={item.id}
                  item={{
                    ...item,
                    priceText: formatCurrency(item.price),
                  }}
                  showCart
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                Không tìm thấy dịch vụ nào.
              </p>
            )}
          </div>
        )}
      </div>

      {/* --- SIDEBAR ĐƠN HÀNG --- */}
      <OrderSidebar
        cartItems={cart}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default SalesManagement;
