const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const mainRouter = require('./routes/index.js'); //

// Load biến môi trường từ file .env
dotenv.config();

const app = express();

// === Middlewares ===
// Cho phép các yêu cầu từ domain khác
app.use(cors());
// Middleware để đọc và xử lý request body dạng JSON
app.use(express.json());


// === Routes ===
// Route gốc để kiểm tra server có hoạt động không
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Project API' });
});

// Sử dụng router chính cho tất cả các route có tiền tố /api
app.use('/api', mainRouter);


// === Khởi động Server ===
const PORT = process.env.PORT || 9999;

app.listen(PORT, async () => {
    try {
        // Kết nối tới Database trước khi server sẵn sàng nhận request
        await connectDB();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(`Error connecting to DB or starting server: ${error.message}`);
        process.exit(1); // Thoát ứng dụng nếu có lỗi nghiêm trọng
    }
});