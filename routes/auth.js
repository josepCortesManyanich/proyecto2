const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', async (req, res, next) => {
  res.render('auth/signup');
})

router.get('/login', async (req, res, next) => {
  res.render('auth/login');
})

router.post('/login', async (req, res, next) => {

  // Check if user introduced all values
  // Check if user exists in DB
  // Check if the password matches the one in the DB
  try {
    //...
    // Remember to assign user to session cookie:
    req.session.currentUser = user;
  } catch (error) {
    next(error);
  }
})

router.post('/signup', async (req, res, next) => {
  // Check if user is already in DB by email (send error)
  // Check if password meets requirements (send error)
  // Hash password and create user
  // Then redirect to login
  try {
  
  } catch (error) {
    next(error)
  }
});

router.post('/logout', (req, res, next) => {
  // This method destroys the session on the database and the cookie
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/auth/login');
    }
  });
})

module.exports = router;
