import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifiedToken = (req, res, next) => {
    const token = req.cookies.sefio_token;

    if(!token) return next(errorHandler(401, "You need to be authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if(error) return next(errorHandler(403, "Your token is not valid!"));
        req.user = user;
        req.userId = user.id; 
        
        console.log("User id verified:", req.userId);
        next();
    });
}