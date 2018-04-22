const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// ==================
// LANDING PAGE ROUTES
// ==================
router.get('/', (req, res) => {
  res.render('landing');
});

// =================
// AUTH ROUTES
// =================

// SHOW REGISTER FORM
router.get('/register', (req, res) => {
  res.render('register');
});

// HANDLE SIGN UP LOGIC
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, () => {
        req.flash('success', `Success! Welcome, ${user.username}`);
        res.redirect('/campgrounds');
      });
    }
  });
});

// SHOW LOGIN FORM
router.get('/login', (req, res) => {
  res.render('login');
});

// HANDLE LOGIN LOGIC
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  (req, res) => {}
);

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out.');
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
