// src/components/layout/Layout.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AuthContext } from "../../context/AuthContext";

// Import pages...
import Dashboard from "../../pages/Dashboard";
import VehicleManagement from "../../pages/VehicleManagement";
import CustomerManagement from "../../pages/CustomerManagement";
import MechanicManagement from "../../pages/MechanicManagement";
import ServiceManagement from "../../pages/ServiceManagement";
import RepairManagement from "../../pages/RepairManagement";
import InvoiceManagement from "../../pages/InvoiceManagement";
import EmployeeManagement from "../../pages/EmployeeManagement";
import SalesManagement from "../../pages/SalesManagement";
import PaymentManagement from "../../pages/PaymentManagement";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false); // ✅ trạng thái sidebar
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Render trang hiện tại
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "vehicles": return <VehicleManagement />;
      case "customers": return <CustomerManagement />;
      case "mechanics": return <MechanicManagement />;
      case "services": return <ServiceManagement />;
      case "repairs": return <RepairManagement />;
      case "invoices": return <InvoiceManagement />;
      case "sales": return <SalesManagement />;
      case "employees": return <EmployeeManagement />;
      case "payments": return <PaymentManagement />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Tổng quan";
      case "vehicles": return "Phương tiện";
      case "customers": return "Khách hàng";
      case "mechanics": return "Thợ sửa chữa";
      case "services": return "Dịch vụ";
      case "repairs": return "Phiếu sửa chữa";
      case "invoices": return "Hóa đơn";
      case "sales": return "Bán hàng";
      case "employees": return "Nhân viên";
      case "payments": return "Thanh toán";
      default: return "";
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar cố định */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Phần nội dung chính tự dịch theo sidebar */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header title={getPageTitle()} />
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)] bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
