import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AuthContext } from "../../context/AuthContext";

// ✅ Import tất cả các trang
import Dashboard from "../../pages/Dashboard";
import VehicleManagement from "../../pages/VehicleManagement";
import CustomerManagement from "../../pages/CustomerManagement";
import MechanicManagement from "../../pages/MechanicManagement";
import ServiceManagement from "../../pages/ServiceManagement";
import RepairManagement from "../../pages/RepairManagement";
import InvoiceManagement from "../../pages/InvoiceManagement";
import ReportManagement from "../../pages/ReportManagement";
import EmployeeManagement from "../../pages/EmployeeManagement";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "vehicles": return <VehicleManagement />;
      case "customers": return <CustomerManagement />;
      case "mechanics": return <MechanicManagement />;
      case "services": return <ServiceManagement />;
      case "repairs": return <RepairManagement />;
      case "invoices": return <InvoiceManagement />;
      case "reports": return <ReportManagement />;
      case "employees": return <EmployeeManagement />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Tổng quan";
      case "vehicles": return "Quản lý xe";
      case "customers": return "Khách hàng";
      case "mechanics": return "Thợ sửa xe";
      case "services": return "Dịch vụ";
      case "repairs": return "Phiếu sửa chữa";
      case "invoices": return "Hóa đơn";
      case "reports": return "Báo cáo";
      case "employees": return "Nhân viên";
      default: return "";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar cố định bên trái */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Khu vực nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Header hiển thị tên trang & nút Đăng xuất */}
        <Header title={getPageTitle()} onLogout={handleLogout} />

        {/* ✅ Nội dung từng trang */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Layout;
