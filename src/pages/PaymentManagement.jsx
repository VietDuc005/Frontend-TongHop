import React, { useState } from "react";
import {  QrCode, Wallet, DollarSign } from "lucide-react";

const PaymentManagement = () => {
  const [methods, setMethods] = useState([
    { id: 1, name: "Tiền mặt", icon: DollarSign, enabled: true, config: null },
    {
      id: 2,
      name: "QR Ngân hàng",
      icon: QrCode,
      enabled: true,
      config: "VietQR từ tài khoản ngân hàng",
    },
    {
      id: 3,
      name: "Ví điện tử Momo",
      icon: Wallet,
      enabled: true,
      config: "QR ví Momo",
    },
    {
      id: 4,
      name: "Ví điện tử ZaloPay",
      icon: Wallet,
      enabled: false,
      config: "QR ví ZaloPay",
    },
  ]);

  const toggleMethod = (id) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Quản lý phương thức Thanh toán
        </h2>
        <p className="text-gray-500 mt-1">
          Bật/tắt và cấu hình các phương thức thanh toán được chấp nhận tại cửa hàng.
        </p>
      </div>

      {/* Danh sách phương thức */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center rounded-lg">
                  <method.icon size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{method.name}</h4>
                  <p className="text-sm text-gray-500">{method.config}</p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={() => toggleMethod(method.id)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <button
              disabled={!method.enabled}
              className={`w-full border rounded-lg py-2 text-sm font-medium transition ${
                method.enabled
                  ? "text-gray-700 hover:bg-gray-50"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              {method.name === "Tiền mặt" ? "Không cần cấu hình" : "Cấu hình"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentManagement;
