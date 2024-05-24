

import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifiedToken = (req, res, next) => {
    const token = req.cookies.sefio_token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId;
        console.log("User verified:", req.user);
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
};
