const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming each hotel has a unique email
  },
  contactNo: {
    type: String,
    required: true,
  },
  gstNo: {
    type: String,
    required: true,
  },
  sacNo: {
    type: String,
    // required: true,
  },
  fssaiNo: {
    type: String,
    required: true,
  },
  hotelLogo: {
    type: String, // You might want to store the path or URL to the image file
    required: true,
  },
  qrCode: {
    type: String, // You might want to store the path or URL to the QR code image file
    required: true,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
