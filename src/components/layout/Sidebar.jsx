import React, { useState } from 'react';
import {
  Menu, X, Home, Car, Users, Wrench,
  Package, FileText, DollarSign, TrendingUp, UserCheck, Settings, LogOut
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [open, setOpen] = useState(false); // ✅ trạng thái mở / thu gọn

  const menuItems = [
    { id: 'dashboard', name: 'Tổng quan', icon: Home },
    { id: 'vehicles', name: 'Quản lý xe', icon: Car },
    { id: 'customers', name: 'Khách hàng', icon: Users },
    { id: 'mechanics', name: 'Thợ sửa xe', icon: Wrench },
    { id: 'services', name: 'Dịch vụ', icon: Package },
    { id: 'repairs', name: 'Phiếu sửa chữa', icon: FileText },
    { id: 'invoices', name: 'Hóa đơn', icon: DollarSign },
    { id: 'reports', name: 'Báo cáo', icon: TrendingUp },
    { id: 'employees', name: 'Nhân viên', icon: UserCheck },
  ];

  return (
    <div
      className={`
        ${open ? 'w-64' : 'w-20'}
        bg-gradient-to-b from-slate-800 to-slate-900
        text-white h-screen flex flex-col justify-between
        transition-all duration-300 overflow-hidden
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {open && <h1 className="text-lg font-bold tracking-wide">Garage Manager</h1>}
        <button onClick={() => setOpen(!open)} className="p-2 hover:bg-slate-700 rounded-lg">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <item.icon size={20} />
            {open && <span className="font-medium">{item.name}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700 w-full">
          <Settings size={20} />
          {open && <span>Cài đặt</span>}
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700 w-full"
        >
          <LogOut size={20} />
          {open && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
