const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds Rest',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/0d/71/ff/2c/oloiden-camping-grounds.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at leo ultrices, eleifend nulla non, ultricies nunc. Nullam sed ante consequat nisl ornare volutpat. Donec et leo posuere, egestas lectus non, pulvinar lectus. Quisque nulla tellus, consequat a tellus eget, tristique pretium nisl. Duis volutpat dolor id tristique posuere. Vivamus in hendrerit ipsum, a sollicitudin orci. Aenean semper pharetra pharetra. Mauris mi velit, ullamcorper eu euismod at, aliquet nec arcu. Curabitur nulla neque, fermentum vitae eros id, cursus consectetur diam. Phasellus fringilla id nibh eu ornare. Morbi libero urna, pulvinar eu auctor a, pretium vel nisl. Cras feugiat placerat quam ut condimentum. Vestibulum ultrices magna elementum, cursus nulla non, iaculis nisl.'
  },
  {
    name: 'Desert Mesa',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqX4R6moWCPu58ZEh8Fx8oIOX3-mfqOcEL1esH9jn5SwQWV83',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at leo ultrices, eleifend nulla non, ultricies nunc. Nullam sed ante consequat nisl ornare volutpat. Donec et leo posuere, egestas lectus non, pulvinar lectus. Quisque nulla tellus, consequat a tellus eget, tristique pretium nisl. Duis volutpat dolor id tristique posuere. Vivamus in hendrerit ipsum, a sollicitudin orci. Aenean semper pharetra pharetra. Mauris mi velit, ullamcorper eu euismod at, aliquet nec arcu. Curabitur nulla neque, fermentum vitae eros id, cursus consectetur diam. Phasellus fringilla id nibh eu ornare. Morbi libero urna, pulvinar eu auctor a, pretium vel nisl. Cras feugiat placerat quam ut condimentum. Vestibulum ultrices magna elementum, cursus nulla non, iaculis nisl.'
  },
  {
    name: 'Canyon Floor',
    image:
      'http://cumberlandriver.com.au/wp-content/uploads/2014/04/cumberland-external-6.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at leo ultrices, eleifend nulla non, ultricies nunc. Nullam sed ante consequat nisl ornare volutpat. Donec et leo posuere, egestas lectus non, pulvinar lectus. Quisque nulla tellus, consequat a tellus eget, tristique pretium nisl. Duis volutpat dolor id tristique posuere. Vivamus in hendrerit ipsum, a sollicitudin orci. Aenean semper pharetra pharetra. Mauris mi velit, ullamcorper eu euismod at, aliquet nec arcu. Curabitur nulla neque, fermentum vitae eros id, cursus consectetur diam. Phasellus fringilla id nibh eu ornare. Morbi libero urna, pulvinar eu auctor a, pretium vel nisl. Cras feugiat placerat quam ut condimentum. Vestibulum ultrices magna elementum, cursus nulla non, iaculis nisl.'
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed existing campgrounds');

      // Add a few campgrounds
      // data.forEach(seed => {
      //   Campground.create(seed, (err, campground) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log('Created a campground');
      //       console.log(campground);

      //       // Create a comment on each campground
      //       Comment.create(
      //         {
      //           text: 'This place is great but I wish there was internet',
      //           author: 'Homer'
      //         },
      //         (err, comment) => {
      //           if (err) {
      //             console.log(err);
      //           } else {
      //             // Push comment to campground
      //             campground.comments.push(comment);
      //             campground.save();
      //             console.log('Created new comment');
      //           }
      //         }
      //       );
      //     }
      //   });
      // });
    }
  });

  // Add a few comments
}

module.exports = seedDB;
