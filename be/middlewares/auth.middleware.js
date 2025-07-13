const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware để bảo vệ các route yêu cầu đăng nhập
const protect = async (req, res, next) => {
    let token;

    // Kiểm tra xem header 'Authorization' có tồn tại và bắt đầu bằng 'Bearer' không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ header (bỏ chữ 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Giải mã token để lấy payload (chứa id và role)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm người dùng trong DB bằng id từ token, không lấy mật khẩu
            req.user = await User.findById(decoded.user.id).select('-password');
            
            if (!req.user) {
                 return res.status(401).json({ message: 'Người dùng không tồn tại' });
            }

            next(); // Chuyển sang middleware hoặc controller tiếp theo
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token không hợp lệ, không có quyền truy cập' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Không có token, không có quyền truy cập' });
    }
};

// Middleware để kiểm tra quyền admin
const admin = (req, res, next) => {
    // Middleware này phải được dùng SAU middleware 'protect'
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Không có quyền admin để thực hiện hành động này' });
    }
};

module.exports = { protect, admin };