const express = require('express');

const Product = require ('../models/product-model.js');

const router = express.Router();

router.get('/products', (req, res, next)=>{
    Product.find((err, productResults)=>{
      if(err){
        next(err);
        return;
      }

      res.render('product-views/products-list-view.ejs',{
        productsAndStuff: productResults
      });
    });
});


// STEP #1 of form submission for a new product
router.get('/products/new', (req, res, next)=>{
  res.render('product-views/new-product-view.ejs');
});

// STEP #2 of form submission for a new product
//<form method="post" action="/products"
    //           |                |
    // -----------                |
    // |             --------------
    // |            |
router.post('/products', (req, res, next)=>{
  const theProduct = new Product({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription,
  });


  theProduct.save((err)=>{
    //if there was an errr that was NOT a validation error
    if (err && theProduct.errors === undefined ){
      next(err);
      return;
    }
    //if there was an error and THERE WERE validation errors
    if (err && theProduct.errors){
      // Create view variables with the error messages
      res.locals.nameValidationErrors = theProduct.errors.name;
      res.locals.priceValidationErrors = theProduct.errors.price;


      //And display the page again.
      res.render('product-views/new-product-view.ejs');
      return;
    }
    // if successful, redirect to a URL not a render view.
    // (redirect is STEP#3 of form submission for a new product)
    res.redirect('/products');
    // you can ONLY redirect to a URL 🌎
  });
});

router.get('/products/:myId/details', (req, res, next)=>{
  ///product/details?myId=59527d0235cb2047999af1e6. Its myId b/c that is what we chose on the URL
  Product.findById(
      req.params.myId,         //1st Argument -> the id to find in the DB
      (err, theProduct)=>{    //2nd Argument -> callback
          if(err){
            next(err);
            return;
          }
          res.render('product-views/product-details-view.ejs',{
              productDetails: theProduct
          });
      }
    );
});


// STEP #1 of form submission for a UPDATING a product

router.get('/products/:myId/edit', (req, res, next)=>{
  Product.findById(
    req.params.myId,             //1st Argument -> the id to find in the DB
    (err, productFromDb)=>{     //2nd Argument -> callback
      if(err){
        next(err);
        return;
      }
      res.render('product-views/edit-product-view.ejs',{
        productDetails : productFromDb
      });
    }
  );
});

// STEP #2 of form subrmission for a new product.
//      <form method="post" action="/products"
//                   |                |
//         -----------                |
//        |             --------------
//        |            |
router.post('/products/:myId/update', (req, res, next)=>{
  Product.findByIdAndUpdate(
    req.params.myId,               //1st Argument -> id of document to update

    {                               //2nd argument -> object of fields to update
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.body.productImageUrl,
      description: req.body.productDescription
    },
    (err, productFromDb) => {     //3rd Argument -> callback!
      if(err){
        next(err);
        return;
      }
      res.redirect('/products/' + productFromDb._id + '/details');
    }
  );

});

router.post('/products/:myId/delete', (req, res, next)=>{
  Product.findByIdAndRemove(
    req.params.myId,
    (err, productFromDb) => {
      if(err){
        next(err);
        return;
      }
      res.redirect('/products/');
    }
  );
});


module.exports = router;
