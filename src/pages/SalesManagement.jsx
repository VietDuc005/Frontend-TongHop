// src/pages/SalesManagement.jsx
import React, { useState } from "react";
import OrderSidebar from "../components/layout/OrderSidebar";
import ProductCard from "../components/common/ProductCard";
import { Search, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Bảo dưỡng cấp nhỏ",
    category: "Bảo dưỡng định kỳ",
    price: 800000,
    description: "Thay dầu, lọc dầu, kiểm tra phanh và ắc quy.",
    image: "https://placehold.co/400x300?text=Bảo+dưỡng+nhỏ",
  },
  {
    id: 2,
    name: "Thay dầu động cơ Castrol",
    category: "Thay thế phụ tùng",
    price: 450000,
    description: "Dầu tổng hợp Castrol Magnatec 4L, phù hợp xe du lịch.",
    image: "https://placehold.co/400x300?text=Thay+dầu+Castrol",
  },
];

const categories = [
  "Tất cả",
  "Bảo dưỡng định kỳ",
  "Sửa chữa điện",
  "Thay thế phụ tùng",
  "Rửa xe - chăm sóc",
  
];

const SalesManagement = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");

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
    alert("Thanh toán thành công!");
    setCart([]);
  };

  const filtered = products.filter((p) => {
    const matchCategory =
      selectedCategory === "Tất cả" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex">
      {/* --- Khu vực sản phẩm --- */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* === Thanh tìm kiếm & lọc === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          {/* Ô tìm kiếm */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ, sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Danh mục + lọc nâng cao */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
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

        {/* === Lưới sản phẩm === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                showCart
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Không tìm thấy sản phẩm nào.
            </p>
          )}
        </div>
      </div>

      {/* --- Sidebar đơn hàng --- */}
      <OrderSidebar
        cartItems={cart}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default SalesManagement;
