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
    const exist = await userModels.findOne({email: userInfo.email}).select('email password');
    console.log("pass 2 Database check");
    if (exist === null) {
      res.json({"authentication": false, message: "This user does not exist"});
    } else {
      if (userInfo.password === exist.password) {
        console.log("works");

        //This gets all the chats (chat_id) that have been created by the user
        const journalExist = await userModels.find()
        .where('email').equals(userInfo.email)
        .where('journal.chat_id').exists(true).select('journal.chat_id');

        //This condition tests for if the user has created a chat before or not.
        if (journalExist.length !== 0) {
          console.log("journal exist");
          {(await userModels.findOne().where('email').equals(userInfo.email).where('journal.chat_id').equals(date()).select('journal.chat_id')) ?
            console.log('The days chat has been created, add to messages of that day')
          :
            console.log('create todays date')
          }
          /*
          await userModels.updateOne(
            {
              email: userInfo.email,
              "journal.chat_id": date(), // replace with your actual chat_id
            },
            {
              $push: {
                "journal.$.messages": {
                  sender: req.body.sender,
                  message: req.body.message,
                  images: req.body.images, // add images if any
                  links: req.body.links   // add links if any
                }
              }
            }
          );
          */
        } else {
          console.log(req.body);
          console.log('journal does not exist, new user');
          await userModels.updateOne(
            { email: userInfo.email },
            {
              $push: {
                journal: {
                  chat_id: date(),
                  messages: [
                    {
                      sender: req.body.sender,
                      message: req.body.message,
                      links: req.body.link,
                      files: req.body.file
                    }
                  ]
                }
              }
            }
          );
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