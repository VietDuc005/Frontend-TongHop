import React from "react";

const Header = () => (
  <header className="bg-white shadow-sm p-6 border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Garage Management</h2>
        <p className="text-gray-500 mt-1">Chào mừng trở lại, Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Hôm nay</p>
          <p className="text-sm font-semibold text-gray-800">
            {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  </header>
);

export default Header;
