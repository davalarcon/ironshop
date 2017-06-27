//  SEED FILE
//      a JavaScript that saves things to your database when you run it
//      makes onboarding easier nd it allows you to re-populate the DB
//      after you delete things)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironshop');
// we have to connect the DB again here b/c the seed.js is SEPARATE from app.js


const Product = require('../models/product-model.js');

const productInfoArray = [
  {
    name: 'Phone Case',
    price: 9.99,
    imageUrl: 'https://media.giphy.com/media/euACplj3oGmiY/giphy.gif',
    description: 'Protects your phone',
  },
  {
    name: 'Bean bag',
    price: 25,
    imageUrl: 'https://media.giphy.com/media/FCACuwkULerp6/giphy.gif',
    description: 'So confortable you can fall on',
  },
  {
    name: 'Tissues',
    price: 13.70,
    imageUrl: 'https://media.giphy.com/media/3o7TKsrfldgW9UXx60/giphy.gif',
    description: 'Capture all debries from any nostril. Very strong but soft',
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];


Product.create(
  productInfoArray,           // 1st Argument -> array of product info objects
  (err, productResults)=> {   // 2nd argument -> callback!
    if(err){
      console.log('OMG! Database error');
      return;
    }
    productResults.forEach((oneProd)=>{
      console.log('New Product! '+ oneProd.name);
    });

  }
);
