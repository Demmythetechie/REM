import express from 'express';
import mongoose from 'mongoose';
const auth = express.Router();
import userModels from '../models/user.js';

(async function () {
  try {
    await mongoose.connect('mongodb+srv://REM:REM-2025@rem-storage.i7padcv.mongodb.net/?retryWrites=true&w=majority&appName=REM-Storage')
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
    console.log(req.body);
    console.log(req.body.firstname);
    const newUser = new userModels({firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email, career: req.body.career, password: req.body.password, verification: false});
    console.log("here")
    await newUser.save();
  } catch(e) {
    console.log(`Error ${e}`);
  }
});

export default auth;