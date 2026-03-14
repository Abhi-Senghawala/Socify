const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

        res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }
};

const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");

            if (user) {
                req.user = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                };
            }
        }
        next();
    } catch (error) {
        next();
    }
}

module.exports = { protect, optionalAuth };