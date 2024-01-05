require('dotenv').config(); // Load environment variables from .env file

const ConnectToMongodb = require('./db');
const express = require('express');
const app = express();
const passport = require('passport'); // Import Passport
const path=require('path')
var cors = require('cors');
const dbHost = process.env.DB_HOST;
const port = process.env.PORT;


ConnectToMongodb();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());

app.use(express.static('uploads')); // 'uploads' should be the directory where your images are stored

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/section', require('./routes/section'));
app.use('/api/table', require('./routes/table'));
app.use('/api/main', require('./routes/mainCategory'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/hotel', require('./routes/hotel'));
app.use('/api/order', require('./routes/order'));
app.use('/api/payment', require('./routes/payment'));

app.listen(port, () => {
  console.log(`MyHotel listening at http://${dbHost}:${port}`);
});


