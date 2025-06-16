import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from "url";
const auth = express.Router();
import userModels from '../models/user.js';
import verifyEmail from '../emails/verifyEmails.js';

//Loaded secret key from evnviroment variable
import dotenv from 'dotenv';
dotenv.config();


//Establishing connection to my mongoDB Atlas
(async function () {
  try {
    await mongoose.connect('mongodb+srv://REM:REM-2025@rem-storage.i7padcv.mongodb.net/REM?retryWrites=true&w=majority&appName=REM-Storage')
    console.log('connected Successfully ✅');
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    process.exit(1);
  }
})();

auth.post('/signup', async (req, res) => {

  /*
  firstName: String,
  lastName: String,
  email: String,
  career: String,
  password: String,
  verification: Boolean
  */

  try {
    const exist = await userModels.findOne({email: req.body.email});
    if (exist === null) {
      const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: '1h' });
      verifyEmail(req.body.email, req.body.firstname, token)
      res.json({signup: true});
    } else {
      res.json({userExist: true, message: "An account with this email has been created."});
    }
  } catch(e) {
    res.json({server: 0, message: e.name});
  }
});

auth.get('/verify/:token', async (req, res) => {
  try {
    const { token } =  req.params;
    const verifying = jwt.verify(token, process.env.SECRET_KEY);
    const newUser = new userModels({firstName: verifying.firstname, lastName: verifying.lastname, email: verifying.email, career: verifying.career, password: verifying.password});
    await newUser.save();
    res.render("verified", {
      title: "Email Verified",
      message: "Your email has been confirmed succesfully"
    });
  } catch(e) {
    if (e.name === 'JsonWebTokenError') {
      res.json({verification: false, message: "Token is being manipulated"});
    } else if(e.name === 'TokenExpiredError') {
      res.json({expired: false, message: 'Token has expired'});
    } else {
      res.json({server: 0, message: e.name});
    }
  }
})

auth.post('/signin', async (req, res) => {
  try {
    const data = req.body;
    const exist = await userModels.findOne({email: data.email});
    if (exist !== null) {
      if (data.password === exist.password) {
        const token = jwt.sign(data, process.env.SIGN_IN_SECRET_KEY);
        res.header('Authorization', `Bearer ${token}`).json({login: true, message: "You have logged in successfully"});
      } else {
        res.json({login: false, message: "Your email or passowrd is wrong"});
      }
    } else {
      res.json({userExist: false, message: "No such user exist"});
    }
  } catch(e) {
    res.json({server: 0, message: e.name});
  }
});

export default auth;