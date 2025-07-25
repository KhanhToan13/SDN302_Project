const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: 0
    },
    imageUrl: {
        type: String,
        default: '/images/default.jpg'
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;