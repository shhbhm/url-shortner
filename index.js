const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Debug: Check if environment variables are loaded
console.log('Environment Variables:', {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET ? 'JWT_SECRET is set' : 'JWT_SECRET is not set'
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected');
    // Start server only after MongoDB connects
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    console.log('Please make sure MongoDB is installed and running on your system');
    process.exit(1);
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/url'));
