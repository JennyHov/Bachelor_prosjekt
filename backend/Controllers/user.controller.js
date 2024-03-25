import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'API IS WORKING',
    });
};

export const updatingUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You need to be logged in to update your account!"));
    }
    try{
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        } 
        const updatingUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profileImage: req.body.profileImage,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatingUser._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only delete your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json( "User was deleted.");
    }catch(error) {
        next(error);
    }
  }
