// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Auth components
import Login from "./components/auth/Login";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import VehicleManagement from "./pages/VehicleManagement";
import CustomerManagement from "./pages/CustomerManagement";
import MechanicManagement from "./pages/MechanicManagement";
import ServiceManagement from "./pages/ServiceManagement";
import RepairManagement from "./pages/RepairManagement";
import InvoiceManagement from "./pages/InvoiceManagement";
import EmployeeManagement from "./pages/EmployeeManagement";
import SalesManagement from "./pages/SalesManagement"; // ✅ thay Report = Sales
import PaymentManagement from "./pages/PaymentManagement";


// ===================== ProtectedRoute Component =====================
const ProtectedRoute = ({ requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin()) return <Navigate to="/login" replace />;

  return <Outlet />; // ✅ render route con
};

// ===================== Main App =====================
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* --- Public routes --- */}
          {/* --- Public routes --- */}
          <Route path="/" element={<Login />} />  {/* ✅ Chạy vào login trước tiên */}
          <Route path="/login" element={<Login />} />


          {/* --- Protected routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<SalesManagement />} /> {/* ✅ thêm */}
              <Route path="/vehicles" element={<VehicleManagement />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/mechanics" element={<MechanicManagement />} />
              <Route path="/services" element={<ServiceManagement />} />
              <Route path="/repairs" element={<RepairManagement />} />
              <Route path="/invoices" element={<InvoiceManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />


              {/* --- Admin only --- */}
              <Route
                path="/employees"
                element={<ProtectedRoute requireAdmin={true} />}
              >
                <Route index element={<EmployeeManagement />} />
              </Route>

              {/* --- Default redirects --- */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
