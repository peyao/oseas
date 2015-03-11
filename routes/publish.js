var Product = require('../models/product.js');

module.exports = {

	publishProduct: function(name, category, price, description, composition, 
		  care, modelHeight, modelSize, sizeSmall, sizeMedium, sizeLarge,
		  mainImage, secondaryImages, callback) {

    console.log('mainImage : ' + mainImage);
    console.log('secondaryImages : ' + secondaryImages);

    var newProduct = new Product({
      name            : name,
      category        : category,
      price           : price,
      description     : description,
      composition     : composition,
      care            : care,
      modelHeight     : modelHeight,
      modelSize       : modelSize,
      sizeSmall       : sizeSmall,
      sizeMedium      : sizeMedium,
      sizeLarge       : sizeLarge,
      mainImage       : mainImage,
      secondaryImages : secondaryImages
    });

    newProduct.save(function(err,savedProduct) {
      if (!err) {
        console.log('Product ' + name + ' successfully saved into the database.');
      }
      else {
        console.log('Error inserting ' + name + ' into the database.');
      }
      callback(savedProduct);
    });
	}
};