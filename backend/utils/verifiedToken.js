

import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifiedToken = (req, res, next) => {
    const token = req.cookies.sefio_token;

    if (!token) return next(errorHandler(401, "You need to be authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) return next(errorHandler(403, "Your token is not valid!"));
        req.user = decoded;  // Sett req.user til å være den dekodede brukeren
        next();
    });
};
