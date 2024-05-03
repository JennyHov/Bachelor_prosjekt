import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'API IS WORKING',
    });
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    const { fullName, email, institution, description, category, role } = req.body;
    const userId = req.user.id;  // Fra verifisert token

    try {
        const existingUser = await User.findOne({ user: userId });
        if (!existingUser) {
            console.log("No existing user found. Creating new one.");
            const user = new User({ fullName, email, institution, description, category, role, user: userId });
            await user.save();
            return res.status(201).json(user);
        }

        if (existingUser.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to update this user" });
        }

        console.log("Updating existing user for user ID:", userId);
        const updatedUser = await User.findByIdAndUpdate(existingUser._id, { fullName, email, institution, description, category, role }, { new: true });
        console.log("User updated successfully:", updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error at user creation/update:", error);
        res.status(500).json({ message: error.message });
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


  export const updateUserProfile = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateBasicInfo = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        const updateFields = {
            fullName: req.body.fullName,  // Update fullName
            email: req.body.email         // Update email
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );
        // Destructuring to omit the password and any other sensitive info from the response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
