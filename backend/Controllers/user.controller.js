import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


  // oppdatere fullname og e-posten sin
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
        // husk å fjern passord
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

  // en sjekk med regex for å fikse at passordet er korrekt
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long, include at least:" <br> "- 1 uppercase letter" <br> "- 1 lowercase letter" <br> "- 1 number." });
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

// slette sin egen bruker
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}
