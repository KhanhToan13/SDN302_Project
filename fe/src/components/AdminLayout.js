import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <NavLink to="/admin/dashboard">Dashboard Đơn hàng</NavLink>
                    <NavLink to="/admin/products">Quản lý Thực đơn</NavLink>
                </nav>
            </aside>
            <main className="admin-main-content">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;