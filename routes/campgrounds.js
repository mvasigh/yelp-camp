const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

// INDEX - show all campgrounds
router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: campgrounds
      });
    }
  });
});

// CREATE - add campground to db
router.post('/', middleware.isLoggedIn, (req, res) => {
  const newCampground = req.body.campground;
  newCampground.author = {
    id: req.user._id,
    username: req.user.username
  };
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('campgrounds');
    }
  });
});

// NEW - show form to create a new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW - shows info about one dog
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, campground) => {
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/show', {
          campground: campground
        });
      }
    });
});

// EDIT - show edit form for campground
router.get('/:id/edit', middleware.checkCampgroundOwner, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    res.render('campgrounds/edit', { campground: campground });
  });
});

// UPDATE - update the campground with entered info
router.put('/:id', middleware.checkCampgroundOwner, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, campground) => {
      if (err) {
        console.log(err);
        res.redirect('/campgrounds');
      } else {
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    }
  );
});

// DESTROY - delete the campground
router.delete('/:id', middleware.checkCampgroundOwner, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
