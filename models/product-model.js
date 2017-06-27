const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const myProductShema = new Schema({
  name: {type: String},
  price: {type: Number, default: 1},
  imageUrl: {type: String, default: '/images/product.gif'},
  description: {type: String},
});


const ProductModel = mongoose.model('Product', myProductShema);
//                                      |
//   ------------------------------------
//  |
//Product -> products -> db.products.find()
//Collection name is automatically determined by mongoose




module.exports = ProductModel;
