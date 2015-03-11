var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

	name 			: { type: String, required: true },
	category		: String,
	price			: String,
	description 	: { type: String, required: true },
	composition		: String,
	care 			: String,
	modelHeight 	: String,
	modelSize 		: String,
	sizeSmall 		: Boolean,
	sizeMedium 		: Boolean,
	sizeLarge 		: Boolean,
	mainImage 		: String,
	secondaryImages	: [{ type: String }]
});

module.exports = mongoose.model('Product', productSchema);
