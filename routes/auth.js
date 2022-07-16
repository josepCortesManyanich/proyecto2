const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');
const Payment = require('../models/payment');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dateIso = new Date(Payment.createdAt);
const day = dateIso.getDay()
const month = dateIso.getMonth()
const year = dateIso.getFullYear()
const date =  `${day}/${month}/${year}`

// @desc    Displays form view to sign up
// @route   GET /auth/signup
// @access  Public
router.get('/signup', async (req, res, next) => {
  res.render('auth/signup');
})

// @desc    Displays User Profile
// @route   GET /auth/profile
// @access  Private
router.get('/profile', isLoggedIn, async (req, res, next) => {
  const user = req.session.currentUser;
  const isAdmin = user.role === 'admin' ? true : false;
  try {
    const payments = await Payment.find({ user: user._id }).populate('products');
    res.render('auth/profile', { payments, user, isAdmin })
    
  } catch (error) {
    next(error)
  }
})

// @desc    Displays form view to log in
// @route   GET /auth/login
// @access  Public
router.get('/login', async (req, res, next) => {
  res.render('auth/login');
})

// @desc    Sends user auth data to database to create a new user
// @route   POST /auth/signup
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!username || !email || !password) {
    res.render('auth/signup', { error: 'All fields are mandatory. Please fill them before submitting.' })
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if(!regex.test(password)){
    res.render('auth/signup', { error: 'Your password must be at least 6 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.' })
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, hashedPassword });
    res.render('auth/login', user)
  } catch (error) {
    next(error)
  }
});

// @desc    Sends user auth data to database to authenticate user
// @route   POST /auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  // ⚠️ Add more validations!
  if (!email || !password) {
    res.render('auth/login', { error: 'All fields are mandatory. Please fill them before submitting.' })
    return;
  }
  else if(User.role==='admin'){
    redirect('/products/create')
  }
  try {
   
    const user = await User.findOne({ email: email });
    if (!user) {
      res.render('auth/login', { error: "User not found, Please Try Again or Sign up" });
      return;
    } else {
      const match = await bcrypt.compare(password, user.hashedPassword);
      if (match) {
        req.session.currentUser = user;
        res.redirect('/auth/profile');
      } else {
        res.render('auth/login', { error: "Unable to authenticate user" });
      }
    }
  } catch (error) {
    next(error);
  }
})

// @desc    Destroy user session and log out
// @route   POST /auth/logout
// @access  Private
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/auth/login');
    }
  });
})

module.exports = router;


