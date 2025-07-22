import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../api/axiosConfig';

const AdminDashboardScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 15000); // Tự động làm mới sau 15 giây
        return () => clearInterval(interval);
    }, []);
    
    const updateStatusHandler = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            alert('Cập nhật trạng thái thất bại');
        }
    };

    const renderOrdersByStatus = (status) => {
        const filteredOrders = orders.filter(order => order.status === status);
        if (filteredOrders.length === 0) {
            return <p>Không có đơn hàng nào.</p>
        }
        return filteredOrders.map(order => (
                <div key={order._id} className="order-card">
                    <h4>Bàn {order.tableNumber} - {new Date(order.createdAt).toLocaleTimeString('vi-VN')}</h4>
                    <ul>
                        {order.orderItems.map(item => (
                            <li key={item.productId}>{item.name} (x{item.quantity})</li>
                        ))}
                    </ul>
                    <p><strong>Tổng: {order.totalAmount.toLocaleString('vi-VN')} VND</strong></p>
                    <div className="order-actions">
                        {status === 'pending' && <button onClick={() => updateStatusHandler(order._id, 'confirmed')} className="btn btn-sm">Xác nhận</button>}
                        {status === 'confirmed' && <button onClick={() => updateStatusHandler(order._id, 'served')} className="btn btn-sm">Đã phục vụ</button>}
                        {status === 'served' && <button onClick={() => updateStatusHandler(order._id, 'paid')} className="btn btn-sm btn-success">Đã thanh toán</button>}
                    </div>
                </div>
            ));
    };

    return (
        <AdminLayout>
            <h1>Dashboard Đơn hàng</h1>
            {loading && <p>Đang tải đơn hàng...</p>}
            <div className="dashboard-columns">
                <div className="dashboard-column"><h2>Mới</h2>{renderOrdersByStatus('pending')}</div>
                <div className="dashboard-column"><h2>Đã xác nhận</h2>{renderOrdersByStatus('confirmed')}</div>
                <div className="dashboard-column"><h2>Đã phục vụ</h2>{renderOrdersByStatus('served')}</div>
                 <div className="dashboard-column"><h2>Đã thanh toán</h2>{renderOrdersByStatus('paid')}</div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardScreen;