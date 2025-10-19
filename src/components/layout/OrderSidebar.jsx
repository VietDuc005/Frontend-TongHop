import React from "react";
import { Trash2 } from "lucide-react";

function OrderSidebar({ cartItems = [], onRemove, onCheckout }) {
  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <aside className="w-80 bg-white border-l border-gray-200 shadow-sm p-4 flex flex-col">
      <h5 className="text-lg font-semibold mb-4 text-gray-800">Đơn hàng hiện tại</h5>

      {/* --- DANH SÁCH SẢN PHẨM --- */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  SL: {item.qty} × {item.price.toLocaleString("vi-VN")} ₫
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-700">
                  {(item.qty * item.price).toLocaleString("vi-VN")} ₫
                </p>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Xóa khỏi giỏ"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <i className="bi bi-basket text-3xl text-gray-400"></i>
            <p className="mt-2">Chưa có sản phẩm nào</p>
          </div>
        )}
      </div>

      {/* --- TỔNG KẾT --- */}
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString("vi-VN")} ₫</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Thuế (8%)</span>
          <span>{tax.toLocaleString("vi-VN")} ₫</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-gray-800 text-base">
          <span>Tổng cộng</span>
          <span className="text-orange-600">
            {total.toLocaleString("vi-VN")} ₫
          </span>
        </div>

        <button
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition ${
            cartItems.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-400 hover:opacity-90"
          }`}
        >
          Thanh toán
        </button>
      </div>
    </aside>
  );
}

export default OrderSidebar;
