const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    tableId:
    {
        type: String,
        required: true
    },
    items:
        [{
            name: String,
            price: Number,
            quantity: Number
        }],
    subtotal:
    {
        type: Number,
        required: true
    },
    CGST:
    {
        type: Number,
        required: true
    },
    SGST: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    isTemporary: {
        type: Boolean,
        default: true, // Set as true for temporary bills
    },
    orderDate: {
        type: Date,
        default: Date.now // Set as the current Date and Time when the order is saved
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order

