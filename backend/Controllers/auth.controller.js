import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    let errors = [];

    if (!fullName) {
      errors.push('Full name is required.');
    } else if (fullName.length > 50) {
        errors.push('Full name must not exceed 50 characters.');
    }

    if (!email) {
        errors.push('Email is required.');
    } else if (email.length > 100) {
        errors.push('Email must not exceed 100 characters.');
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        errors.push('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one numeral.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(' '), success: false });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    try{
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' });
    } catch(error){
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email  });
        if(!validUser) return next(errorHandler(400, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(400, "Wrong email or password!"));
        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiredDate = new Date(Date.now() + 3600000) // 2 hours = 2*60*60*1000= 7200000
        res
            .cookie('sefio_token', token, { httpOnly: true, expires: expiredDate})
            .status(200)
            .json(rest);
    }catch(error){
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 7200000); // 2 hours
        res
          .cookie('sefio_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const random1 = Math.random().toString(36).slice(-6);
        const random2 = Math.random().toString(36).slice(-6);
        const generatedPassword = random1 + random2;
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          fullName:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-10),
          email: req.body.email,
          password: hashedPassword,
          profileImage: req.body.photo,
          role: "user",
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 2 hours
        res
          .cookie('sefio_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

export const signout = (req, res) => {
  res.clearCookie('sefio_token').status(200).json('Signout success!');
};