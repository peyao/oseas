var Product = require('../models/product.js');

module.exports = {

	getProduct: function(productName, callback) {
    Product.findOne({ "name": productName }, function(err, product) {
      callback(product);
    });
	},

  getAllProducts: function(callback) {
    Product.find({}, function(err, products) {
      callback(products);
    });
  }
};