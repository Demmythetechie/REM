const express = require('express');
const auth = express.Router();

auth.get('/signup', (req, res) => {
  res.send('User Page');
});

module.exports = auth;