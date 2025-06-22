import express from "express";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userModels from '../models/user.js';

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
    console.log(JSON.stringify(req.body.data));
    res.send(JSON.stringify(req.body.data));
  } catch(e) {
    res.send('failed');
  }
});

export default journal;