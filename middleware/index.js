const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        req.flash('error', 'Campground not found.');
        res.redirect('back');
      } else {
        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You are not authorized to edit this campground.');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You are not authorized to edit this comment.');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You must log in first before doing that.');
    res.redirect('/login');
  }
};

module.exports = middlewareObj;
