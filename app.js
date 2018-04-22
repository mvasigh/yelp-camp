const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const seedDB = require('./seeds');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Seed the database
// seedDB();

// ===============
// PASSPORT CONFIG
// ===============
app.use(
  require('express-session')({
    secret: 'The quick brown fox jumps over the lazy dog',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, () => {
  console.log('YelpCamp server is now running');
});
