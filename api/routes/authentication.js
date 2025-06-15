const express = require('express');
const auth = express.Router();

auth.get('/signup', (req, res) => {
  res.send('Sign up Page');
});

module.exports = auth;