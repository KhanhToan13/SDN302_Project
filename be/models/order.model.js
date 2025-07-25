const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
});

const orderSchema = new Schema({
    tableNumber: { type: String, required: [true, 'Số bàn là bắt buộc'] },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'served', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);