const express = require('express');

const Product = require('../models/product-model.js');

const ReviewModel = require('../models/review-model.js');

const router = express.Router();

// ROUTE #1 -> Display the form to create a new reviewSchema

router.get('/products/:productId/reviews/new', (req, res, next)=>{

    Product.findById(
      req.params.productId,     // 1st argument -> product ID
      (err, productFromDb)=>{   // 2nd argument -> callback
        if (err) {
          next(err);
          return;
        }
        res.locals.productDetails = productFromDb;

        res.render('review-views/new-review-form.ejs');
      }
    );

  });

// ROUTE #2 -> Receive that form submission and do database stuff.
  console.log("we're in");
router.post('/products/:productId/reviews', (req, res, next)=>{

  Product.findById(
    req.params.productId,
    (err, productFromDb)=>{
      if(err){
        next(err);
        return;
      }
        const theReview = new ReviewModel({
        author:  req.body.reviewAuthor,
        stars:  req.body.reviewStars,
        content:  req.body.reviewContent
      });
      // Add the review to the product's 'reviews' array
      productFromDb.reviews.push(theReview);

      // Save the product with the new reviews
      productFromDb.save((err)=>{
        if(err && productFromDb.errors === undefined){
          next(err);
          return;
        }
        if (err && productFromDb.errors){
          res.locals.authorValidationErros = productFromDb.errors.author;

          res.render('review-views/new-review-form.ejs');
          return;
        }
        res.redirect('/products/'+ productFromDb._id+ '/details');
      });
    }
  );
});



module.exports = router;
