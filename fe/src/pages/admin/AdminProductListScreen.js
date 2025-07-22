import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import AdminLayout from '../../components/AdminLayout';

const AdminProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (err) {
            setError('Không thể tải danh sách sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await api.delete(`/products/${id}`);
                alert('Xóa sản phẩm thành công!');
                fetchProducts();
            } catch (error) {
                alert('Xóa sản phẩm thất bại.');
            }
        }
    };
    
    return (
        <AdminLayout>
            <div className="header-section">
                <h1>Quản lý Thực đơn</h1>
                <button className="btn" onClick={() => navigate('/admin/product/create')}>Thêm món mới</button>
            </div>
            
            {loading ? <p>Đang tải...</p> : error ? <div className="error-message">{error}</div> : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TÊN</th>
                            <th>GIÁ</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString('vi-VN')} VND</td>
                                <td>
                                    <button className="btn btn-sm" onClick={() => navigate(`/admin/product/${product._id}/edit`)}>Sửa</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default AdminProductListScreen;