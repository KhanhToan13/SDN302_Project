const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Đăng ký người dùng mới
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { fullName, email, password, address, phoneNumber } = req.body;

    try {
        // 1. Kiểm tra email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // 2. Tạo người dùng mới
        user = new User({
            fullName,
            email,
            password,
            address,
            phoneNumber
        });

        // 3. Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Lưu người dùng vào DB
        await user.save();

        // 5. Tạo và trả về token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Bạn cần tạo một biến JWT_SECRET trong file .env
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi từ server');
    }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Kiểm tra email người dùng
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
        }

        // 3. Tạo và trả về token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi từ server');
    }
};