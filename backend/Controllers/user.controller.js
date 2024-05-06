import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


  
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


export const updatePassword = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }

  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ message: "New password is required." });
  }

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    await User.findByIdAndUpdate(
      req.params.id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};
