const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// NEW - show form to create a new comment
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {
        campground: campground
      });
    }
  });
});

// CREATE - post comment to the campground
router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Something went wrong.');
          res.redirect('/campgrounds');
        } else {
          // add username and id to the comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;

          // save comment
          comment.save();

          campground.comments.push(comment);
          campground.save();

          req.flash('success', 'Successfully posted your comment!');
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      });
    }
  });
});

// EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwner, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        comment: comment,
        campground_id: req.params.id
      });
    }
  });
});

// UPDATE
router.put('/:comment_id', middleware.checkCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    {
      text: req.body.comment.text
    },
    (err, comment) => {
      if (err) {
        res.redirect('back');
      } else {
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    }
  );
});

// DESTROY
router.delete('/:comment_id', middleware.checkCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Comment successfully removed.');
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
