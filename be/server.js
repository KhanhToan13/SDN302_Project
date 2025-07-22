const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mainRouter = require('./routes/index');

dotenv.config();
const app = express();
connectDB();

// Chỉ cần CORS cơ bản và body-parser
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dùng router chính
app.use('/api', mainRouter);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
