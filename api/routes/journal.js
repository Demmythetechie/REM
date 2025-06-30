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

journal.get('/load', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const cleanToken = token.replace("Bearer ", "");
    const userInfo = jwt.verify(cleanToken, process.env.SIGN_IN_SECRET_KEY);
    console.log("Pass 1 token verified");
    const exist = await userModels.findOne().where('email').equals(userInfo.email).where('password').equals(userInfo.password).select('email -_id');
    console.log("Pass 1 database verified");
    if (exist === null) {
      console.log("This user does not exist");
      res.json({"userExists": false, message: "This user does not exist"})
    } else {
      console.log("This user exist");
      // This finds all the chats of the user
      const chat = await userModels.find()
        .where('email').equals(userInfo.email)
        .where('journal.chat_id').exists(true).select('-_id journal.chat_id');
      const dt = chat[chat.length - 1];
      console.log(dt);
      const allChat = dt.journal;
      console.log("Pass 2 database verified");

      //This gets the user chat for that day
      const lastChat = await userModels.findOne()
      .where('email').equals(userInfo.email)
      .where('journal').elemMatch({ chat_id: date() })
      .select('journal.$ -_id');

      console.log("Pass 3 database verified");
      console.log(JSON.stringify(lastChat, null, 2));
      res.json({preload: lastChat ? true : false, chatList: allChat, messages: lastChat})
    }
  } catch(e) {
    if (e.name === 'JsonWebTokenError') {
      res.json({verification: false, message: "Token is being manipulated"});
    } else if(e.name === 'TokenExpiredError') {
      res.json({expired: false, message: 'Token has expired'});
    } else {
      res.json({server: 0, message: e.name});
    }
  }
});

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
      res.json({"userExists": false, message: "This user does not exist"});
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
            // Update chat if already created and still within 24 hrs(still within the same day)
            await updateChat(userInfo, date(), req)
          :
            // This creates a new chat but other chats exist for previous days already (not that it is empty)
            await createChat(userInfo, date(), req)
          }
        } else {
          console.log('journal does not exist, new user');
          await createChat(userInfo, date(), req); 
        }

        // This finds the last chat of the user
        const lastChat = await userModels.find()
        .where('email').equals(userInfo.email)
        .where('journal.chat_id').exists(true).select('-_id journal.chat_id');
        const dt = lastChat[lastChat.length - 1];
        console.log(dt);
        const dt2 = dt.journal;
        console.log(dt2);
        const lastChatId = dt2[dt2.length - 1].chat_id;

        //This block of code then updates the user's last chat with REM's response
        await userModels.updateOne(
          {
            email: userInfo.email,
            "journal.chat_id": lastChatId
          },
          {
            $push: {
              "journal.$.messages": {
                sender: "REM",
                message: "The user's prompt has been responded to",
                links: [],
                files: []
              }
            }
          }
        );
        const response = await userModels.findOne()
        .where('email').equals(userInfo.email)
        .where('journal').elemMatch({ chat_id: lastChatId })
        .select('journal.$ -_id');

        console.log(JSON.stringify(response));
        res.json(response);
      } else {
        res.json({"authentication": false, message: "This token is probably expired"});
      }
    }
  } catch(e) {
    if (e.name === 'JsonWebTokenError') {
      res.json({verification: false, message: "Token is being manipulated"});
    } else if(e.name === 'TokenExpiredError') {
      res.json({expired: true, message: 'Token has expired'});
    } else {
      res.json({server: 0, message: e.name});
    }
  }
});













//REUSABLE BLOCKS


// This function Create the chat of the day database for the user------------------------------------------START
async function createChat(userInfo, date, request) {
  await userModels.updateOne(
    { email: userInfo.email },
    {
      $push: {
        journal: {
          chat_id: date,
          messages: [
            {
              sender: request.body.sender,
              message: request.body.message,
              links: request.body.link,
              files: request.body.file
            }
          ]
        }
      }
    }
  );
}
//------------------------------------------------------------------------------------------------------END


// This function Updates the chat of the day database for the user------------------------------------------START
async function updateChat(userInfo, date, request) {
  await userModels.updateOne(
    {
      email: userInfo.email,
      "journal.chat_id": date
    },
    {
      $push: {
        "journal.$.messages": {
          sender: request.body.sender,
          message: request.body.message,
          links: request.body.links,
          files: request.body.file
        }
      }
    }
  );
}
//-----------------------------------------------------------------------------------------------------END

export default journal;