var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	models = require('./models/venues')(app, mongoose),
	VenuesController = require("./controllers/heritage");

mongoose.connect('mongodb://semplicetta:tortorella@ds039431.mongolab.com:39431/data4viz', function(err, res){
	if(err) throw err;
	console.log('Connected to Database');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

/*router.get('/', function(req, res){
	res.send("Hola mundo");
});*/
router.get('/', function(req, res){
	res.sendFile(__dirname + '/static/index.html');
});

app.use(router);

var venues = express.Router();

venues.route('/venues')
	.get(VenuesController.findAllVenues)
	.post(VenuesController.addVenue);

venues.route('/venues/:id')
	.get(VenuesController.findById)
	.put(VenuesController.updateVenue)
	.delete(VenuesController.deleteVenue);

app.use('/api', venues);

//res.sendfile(__dirname + '/public/home.html');

/*
connect()
  .use(connect.static(__dirname + '/static'))*/

app.listen(3000, function(){
	console.log("Node server running on http://localhost:3000");
})