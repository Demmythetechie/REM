import express, { json } from "express";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userModels from '../models/user.js';
import { date } from "../utility.js";

const journal = express.Router();

//This loads enviromental variable
import dotenv from 'dotenv';
dotenv.config();

(async function () {
  try {
    await mongoose.connect('mongodb+srv://REM:REM-2025@rem-storage.i7padcv.mongodb.net/REM?retryWrites=true&w=majority&appName=REM-Storage')
    console.log('connected Successfully ✅');
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    process.exit(1);
  }
})();

journal.post('/', async (req, res) => {
  try {
    //Authentication using JWT token
    const token = req.headers['authorization'];
    const cleanToken = token.replace("Bearer ", "");
    const userInfo = jwt.verify(cleanToken, process.env.SIGN_IN_SECRET_KEY);
    console.log("Pass 1 token verified");
    const exist = await userModels.findOne({email: userInfo.email}).select('email password firstName lastName');
    console.log("pass 2 Database check");
    if (exist === null) {
      res.json({"authentication": false, message: "This user does not exist"});
    } else {
      if (userInfo.password === exist.password) {
        console.log("works");
        const journalExist = await userModels.findOne()
        .where('email').equals(userInfo.email)
        .emptyJournal().select('email');
        if (journalExist) {
          console.log("journal exist");
          console.log(journalExist);
        } else {
          console.log('journal does not exist, new user');
          const currentDate = date();
          const journalOpenedForToday = {
            chat_id: currentDate,
            messages: [
              {
                sender: req.body.sender,
                message: req.body.message
              }
            ] 
          }
        }

        res.json({"authentication": true, message: "Works just fine"});
      } else {
        console.log("Not working");
        res.json({"authentication": false, message: "This token is probably expired"});
      }
    }
  } catch(e) {
    res.send('failed');
    console.log("failed");
  }
});

export default journal;