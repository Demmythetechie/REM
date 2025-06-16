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
import { measureMemory } from 'vm';
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
      res.json({exist: true, message: "An account with this email has been created."});
    }
  } catch(e) {
    res.json({server: 0});
  }
});

auth.get('/verify/:token', async (req, res) => {
  try {
    const { token } =  req.params;
    const verifying = jwt.verify(token, process.env.SECRET_KEY);
    const newUser = new userModels({firstName: verifying.firstname, lastName: verifying.lastname, email: verifying.email, career: verifying.career, password: verifying.password});
    await newUser.save();
    console.log("works");
    res.render("verified", {
      title: "Email Verified",
      message: "Your email has been confirmed succesfully"
    });
  } catch(e) {
    console.log();
  }
})

export default auth;