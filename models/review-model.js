const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    default: 'Amazing. 5/5. Would by again!'
  },
  stars:   {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  author:  {
    type: String,
    required: [true,'Please enter your name'],
  },
  email:{
    type: String,
    match: /.+@.+/,
  },

});

const ReviewModel = mongoose.model('Review', reviewSchema);


module.exports = ReviewModel;
