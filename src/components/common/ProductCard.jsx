// src/components/common/ProductCard.jsx
import React from "react";

const ProductCard = ({
  item,
  showCart = false,
  onAddToCart,
  customActions, // 👈 truyền các nút như Xem, Sửa, Xóa từ bên ngoài
}) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Ảnh sản phẩm / xe */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        {/* Tiêu đề */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {item.name}
        </h3>

        {/* Mô tả ngắn */}
        {item.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Thông tin chi tiết */}
        {item.details && (
          <p className="text-sm font-medium text-gray-600 mb-3">
            {item.details}
          </p>
        )}

        {/* --- Khu vực hành động --- */}
        <div className="flex justify-between items-center mt-3">
          {showCart ? (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Thêm
            </button>
          ) : (
            customActions && <div className="flex gap-2">{customActions}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
