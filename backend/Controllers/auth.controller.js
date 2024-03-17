import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
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
        if(!validPassword) return next(errorHandler(400, "wrong credentials"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiredDate = new Date(Date.now() + 3600000) // an hour = 60*60*1000= 3600000
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
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
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-10),
          email: req.body.email,
          password: hashedPassword,
          profileImage: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
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