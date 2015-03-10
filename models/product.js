var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

	name: 			String,
	description:	String,
	difficulty: 	Number,
	required_items: [{ type: String }],
	optional_items: [{ type: String }],
	image: String,
	author: String
});

module.exports = mongoose.model('Product', productSchema);
