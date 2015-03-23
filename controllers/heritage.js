//file: controllers/heritage.js

var mongoose = require("mongoose");
var Venue  = mongoose.model('Venue');

//GET - return all venues in the DB
exports.findAllVenues = function(req, res){
	Venue.find(function(err, venues){
		if(err) res.send(500, err.message);

		console.log('GET/venues');
		res.status(200).jsonp(venues);
	});
};

//GET - return a venue with specific ID
exports.findById = function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		if (err) return res.send(500, err.message);

		console.log('GET /tvshow/' + req.params.id);
		res.status(200).jsonp(venue);
	});
};

//POST - Insert a new venue in the DB
exports.addVenue = function(req, res){
	console.log('POST');
	console.log(req.body);

	var venue = new Venue({
		title	: req.body.title,
		comment	: req.body.comment,
		year	: req.body.year,
		poster	: req.body.poster
	});

	venue.save(function(err, venue){
		if(err) return res.send(500, err.message);

		res.status(200).jsonp(venue);
	})
}

//PUT - Update a register that already exists
exports.updateVenue = function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		venue.title		= req.body.title;
		venue.comment	= req.body.comment;
		venue.year		= req.body.year;
		venue.poster	= req.body.poster;

		venue.save(function(err){
			if(err){
				return res.send(500, err.message);
			}

			res.status(200).jsonp(venue);
		})
	})
}

//DELETE - Delete a Venue with specific ID
exports.deleteVenue = function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		venue.remove(function(err){
			if(err){
				return res.send(500, err.message);
			}else{
				res.status(200).jsonp(venue);
				
			}

		})
	});
};