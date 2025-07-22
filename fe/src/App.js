import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Customer Page
import OrderScreen from './pages/OrderScreen';

// Admin Pages
import AdminDashboardScreen from './pages/admin/AdminDashboardScreen';
import AdminProductListScreen from './pages/admin/AdminProductListScreen';
import AdminProductEditScreen from './pages/admin/AdminProductEditScreen';

import './App.css';

function App() {
    return (
        // Không cần AuthProvider nữa
        <Router>
            <Routes>
                {/* ========== Customer Route ========== */}
                <Route path="/" element={<OrderScreen />} />

                {/* ========== Admin Routes (Giờ là public) ========== */}
                {/* Không cần AdminRoute hay trang login nữa */}
                <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
                <Route path="/admin/products" element={<AdminProductListScreen />} />
                <Route path="/admin/product/create" element={<AdminProductEditScreen />} />
                <Route path="/admin/product/:id/edit" element={<AdminProductEditScreen />} />
            </Routes>
        </Router>
    );
}

export default App;
