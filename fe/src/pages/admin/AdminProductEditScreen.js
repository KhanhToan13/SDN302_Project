import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import AdminLayout from '../../components/AdminLayout';

const AdminProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [description, setDescription] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const { data } = await api.get(`/products/${productId}`);
                    setName(data.name);
                    setPrice(data.price);
                    setImageUrl(data.imageUrl)
                    setDescription(data.description);
                } catch (err) {
                    setError('Không thể tải thông tin sản phẩm.');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const productData = { name, price, imageUrl, description };
        try {
            if (productId) {
                await api.put(`/products/${productId}`, productData);
            } else {
                await api.post('/products', productData);
            }
            alert(`Đã ${productId ? 'cập nhật' : 'tạo'} sản phẩm thành công!`);
            navigate('/admin/products');
        } catch (err) {
            setError(`Lỗi khi ${productId ? 'cập nhật' : 'tạo'} sản phẩm.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="form-container">
                <Link to="/admin/products" className="btn btn-light my-3">&larr; Quay lại</Link>
                <h1>{productId ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}</h1>
                {loading && <p>Đang tải...</p>}
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Giá</label>
                        <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">URL Hình ảnh</label>
                        <input id="imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="VD: /images/ca-phe.jpg"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : (productId ? 'Cập nhật' : 'Tạo mới')}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminProductEditScreen;