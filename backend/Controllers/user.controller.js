import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'API IS WORKING',
    });
};

export const updateUser = async (req, res, next) => {
    const { fullName, email, profileImage } = req.body;
    const userId = req.params.id;
    
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, email, profileImage },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
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

  export const changePassword = async (req, res, next) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
  
    try {

      console.log('userId:', userId);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }
  
      const hashedNewPassword = await bcryptjs.hash(newPassword, 12);
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password. Please try again.' });
    }
  };