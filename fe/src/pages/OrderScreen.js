import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axiosConfig';

const OrderScreen = () => {
    const [searchParams] = useSearchParams();
    const tableNumber = searchParams.get('table') || 'Tại quầy';

    const [products, setProducts] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (err) {
                setError("Không thể tải thực đơn. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToOrder = (product) => {
        setCurrentOrder(prevOrder => {
            const existItem = prevOrder.find(item => item.productId === product._id);
            if (existItem) {
                return prevOrder.map(item => item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                return [...prevOrder, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (product) => {
        setCurrentOrder(prevOrder => {
            const existItem = prevOrder.find(item => item.productId === product.productId);
            if (existItem.quantity === 1) {
                return prevOrder.filter(item => item.productId !== product.productId);
            } else {
                return prevOrder.map(item => item.productId === product.productId ? { ...item, quantity: item.quantity - 1 } : item);
            }
        });
    };

    const submitOrder = async () => {
        if (currentOrder.length === 0) {
            alert('Vui lòng chọn món trước khi gửi.');
            return;
        }
        try {
            await api.post('/orders', { orderItems: currentOrder, tableNumber });
            alert(`Bàn ${tableNumber} đã gửi đơn hàng thành công! Cảm ơn quý khách.`);
            setCurrentOrder([]);
        } catch (error) {
            alert('Gửi đơn hàng thất bại, vui lòng gọi nhân viên.');
        }
    };

    const total = currentOrder.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div className="order-container">
            <div className="menu-section">
                <header className="order-header"><h1>Thực đơn - Bàn số: <strong>{tableNumber}</strong></h1></header>
                {loading && <p>Đang tải thực đơn...</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product._id} className="product-card" onClick={() => addToOrder(product)}>
                            <img src={product.imageUrl || '/images/default.jpg'} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="price">{product.price.toLocaleString('vi-VN')} VND</p>
                            <span className="add-to-cart-plus">+</span>
                        </div>
                    ))}
                </div>
            </div>
            <aside className="current-order-section">
                <h2>Đơn hàng của bạn</h2>
                <div className="order-items-list">
                    {currentOrder.length === 0 && <p className="empty-order">Vui lòng chọn món từ thực đơn.</p>}
                    {currentOrder.map(item => (
                        <div key={item.productId} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <div className="quantity-controls">
                                <button className="quantity-btn" onClick={() => decreaseQuantity(item)}>-</button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button className="quantity-btn" onClick={() => addToOrder({_id: item.productId})}>+</button>
                            </div>
                            <span className="item-price">{(item.price * item.quantity).toLocaleString('vi-VN')}</span>
                        </div>
                    ))}
                </div>
                <div className="order-summary">
                    <h3>Tổng cộng: {total.toLocaleString('vi-VN')} VND</h3>
                    <button className="btn btn-primary btn-block" onClick={submitOrder} disabled={currentOrder.length === 0}>Gửi Đơn Hàng</button>
                </div>
            </aside>
        </div>
    );
};

export default OrderScreen;