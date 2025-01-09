import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

// Supplier Dashboard and Pages
import SupplierDashboard from './components/dashboards/SupplierDashboard';
import SupplierDashboardPage from './pages/SupplierDashboardPage';
import SupplierMaterialsPage from './pages/SupplierMaterialsPage';
import SupplierOrdersPage from './pages/SupplierOrdersPage';
import SupplierAnalyticsPage from './pages/SupplierAnalyticsPage';
import SupplierNotificationsPage from './pages/SupplierNotificationsPage';
import SupplierProfilePage from './pages/SupplierProfilePage';

// Manufacturer Dashboard and Pages
import ManufacturerDashboard from './components/dashboards/ManufacturerDashboard';
import ManufacturerDashboardPage from './pages/ManufacturerDashboardPage';
import ManufacturerPlaceOrderPage from './pages/ManufacturerPlaceOrderPage';
import ManufacturerProcurementOrdersPage from './pages/ManufacturerProcurementOrdersPage';
import ManufacturerCreateSaleOrderPage from './pages/ManufacturerCreateSaleOrderPage';
import ManufacturerSalesPage from './pages/ManufacturerSalesPage';
import ManufacturerWarehousePage from './pages/ManufacturerWarehousePage';
import ManufacturerTrackOrdersPage from './pages/ManufacturerTrackOrdersPage';  // Newly added
import ManufacturerAnalyticsPage from './pages/ManufacturerAnalyticsPage';
import ManufacturerNotificationsPage from './pages/ManufacturerNotificationsPage';
import ManufacturerProfilePage from './pages/ManufacturerProfilePage';

// Other Dashboards
import MiddlemenDashboard from './components/dashboards/MiddlemenDashboard';
import LogisticsDashboard from './components/dashboards/LogisticsDashboard';
import CustomerDashboard from './components/dashboards/CustomerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing, Signup, and Login Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Supplier Dashboard Routes with Nested Pages */}
        <Route path="/supplier" element={<SupplierDashboard />}>
          <Route path="dashboard" element={<SupplierDashboardPage />} />
          <Route path="materials" element={<SupplierMaterialsPage />} />
          <Route path="orders" element={<SupplierOrdersPage />} />
          <Route path="analytics" element={<SupplierAnalyticsPage />} />
          <Route path="notifications" element={<SupplierNotificationsPage />} />
          <Route path="profile" element={<SupplierProfilePage />} />
        </Route>

        {/* Manufacturer Dashboard Routes with Nested Pages */}
        <Route path="/manufacturer" element={<ManufacturerDashboard />}>
          <Route path="dashboard" element={<ManufacturerDashboardPage />} />
          <Route path="place-order" element={<ManufacturerPlaceOrderPage />} />
          <Route path="procurement-orders" element={<ManufacturerProcurementOrdersPage />} />
          <Route path="create-sale-order" element={<ManufacturerCreateSaleOrderPage />} />
          <Route path="sales" element={<ManufacturerSalesPage />} />
          <Route path="warehouse" element={<ManufacturerWarehousePage />} />
          <Route path="track-orders" element={<ManufacturerTrackOrdersPage />} />  {/* Newly added */}
          <Route path="analytics" element={<ManufacturerAnalyticsPage />} />
          <Route path="notifications" element={<ManufacturerNotificationsPage />} />
          <Route path="profile" element={<ManufacturerProfilePage />} />
        </Route>

        {/* Other Dashboards */}
        <Route path="/middlemen/dashboard" element={<MiddlemenDashboard />} />
        <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
