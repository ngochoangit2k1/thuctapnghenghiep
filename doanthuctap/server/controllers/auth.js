import mongoose from "mongoose";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import createError from "http-errors"
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
  
      await newUser.save();
      res.status(200).send("User has been created!");
    } catch (err) {
      next(err);
    }
  };
  
  export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, "User not found!"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWTPrivateKey);
      const { password, ...others } = user._doc;
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } catch (err) {
      next(err);
    }
  };
  export const logout = async (req, res, next) => {
    try{
      const token = jwt.sign({ id: user._id }, process.env.JWTPrivateKey);
      let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
      let randomIndex = Math.floor((Math.random() * 10) + 1);
      let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
  
      // now just concat the hashed random number to the end of the token
      req.token = token + hashedRandomNumberToAppend;
      return res.status(200).json('logout');
  }catch(err){
      return res.status(500).json(err.message);
  }
  };
  
  export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWTPrivateKey);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWTPrivateKey);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };
  