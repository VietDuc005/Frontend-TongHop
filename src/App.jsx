import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import VehicleManagement from './pages/VehicleManagement';
import CustomerManagement from './pages/CustomerManagement';
import MechanicManagement from './pages/MechanicManagement';
import ServiceManagement from './pages/ServiceManagement';
import RepairManagement from './pages/RepairManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import ReportManagement from './pages/ReportManagement';
import EmployeeManagement from './pages/EmployeeManagement';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vehicles" element={<VehicleManagement />} />
                    <Route path="/customers" element={<CustomerManagement />} />
                    <Route path="/mechanics" element={<MechanicManagement />} />
                    <Route path="/services" element={<ServiceManagement />} />
                    <Route path="/repairs" element={<RepairManagement />} />
                    <Route path="/invoices" element={<InvoiceManagement />} />
                    <Route path="/reports" element={<ReportManagement />} />

                    {/* Admin only route */}
                    <Route
                      path="/employees"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <EmployeeManagement />
                        </ProtectedRoute>
                      }
                    />

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
