import express from 'express';
const auth = express.Router();

auth.get('/signup', (req, res) => {
  res.send('Sign up Page');
});

export default auth;