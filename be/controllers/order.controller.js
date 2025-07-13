const Order = require('../models/order.model');
const Product = require('../models/product.model');

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress } = req.body;
    
    // Lấy userId từ middleware xác thực (sẽ được tạo sau)
    const userId = req.user.id; 

    try {
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }

        // Tính tổng tiền từ DB để đảm bảo an toàn, không tin tưởng giá từ client
        let totalAmount = 0;
        const populatedOrderItems = await Promise.all(orderItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại.`);
            }
            totalAmount += product.price * item.quantity;
            return {
                ...item,
                name: product.name,
                price: product.price
            };
        }));
        
        const order = new Order({
            userId,
            orderItems: populatedOrderItems,
            shippingAddress,
            totalAmount
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Lấy các đơn hàng của người dùng đang đăng nhập
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// @desc    Lấy tất cả đơn hàng (chỉ admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        // Dùng populate để lấy thêm thông tin người dùng từ `userId`
        const orders = await Order.find({}).populate('userId', 'fullName email');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Cập nhật trạng thái đơn hàng (chỉ admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};