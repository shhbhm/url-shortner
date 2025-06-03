const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/auth/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.redirect('/auth/login');
        }

        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

module.exports = auth; 