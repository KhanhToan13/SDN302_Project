const Order = require('../models/order.model');
const Product = require('../models/product.model');


exports.createOrder = async (req, res) => {
    const { orderItems, tableNumber } = req.body;
    try {
        if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'Không có món nào trong đơn hàng' });
        if (!tableNumber) return res.status(400).json({ message: 'Vui lòng cung cấp số bàn' });

        let totalAmount = 0;
        const populatedOrderItems = await Promise.all(orderItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error(`Sản phẩm ID ${item.productId} không tồn tại.`);
            totalAmount += product.price * item.quantity;
            return { ...item, name: product.name, price: product.price };
        }));

        const order = new Order({ tableNumber, orderItems: populatedOrderItems, totalAmount });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};s


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};