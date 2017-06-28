const mongoose = require ('mongoose');

const ReviewModel = require('./review-model.js');

const Schema = mongoose.Schema;

const myProductShema = new Schema({
  name: {
    type: String,
    required: [true,' Please tell us your name'],
    minlength: [3,'Name must be 3 characters or longer'],
    maxlength: [250, 'Name cannot be longer than 255 characters']
  },
  price: {
    type: Number,
    required: [true, 'please enter a price'],
    default: 1,
    min: [0,'Price cannot be a negative number'],
    max: [1000,'price cannot be over $1000'],
  },
  imageUrl: {
    type: String,
    default: '/images/product.gif'
  },
  description: {type: String},
  // category: {
  //   type: String,
  //   enum: ['Tech', 'Food', 'Apparel', 'Home', 'Footwear']
  // },

//Add a field inside of product documents called "reviews".
//The fiels is an array of ReviewModel objects with content, stars and author.
  reviews: [ ReviewModel.schema ]
                        // |
                        //schema of the ReviewModel (different from the Schema var)
});


const ProductModel = mongoose.model('Product', myProductShema);
//                                      |
//   ------------------------------------
//  |
//Product -> products -> db.products.find()
//Collection name is automatically determined by mongoose




module.exports = ProductModel;
