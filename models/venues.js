var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var venueSchema = new Schema ({
	title	: { type: String },
	comment	: { type: String },
	year	: { type: Number },
	poster	: { type: String }
});

module.exports = mongoose.model("Venue", venueSchema);