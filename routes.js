

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


// middleware to show requests
const middleware = require("./middleware/debug-request-times");
router.use(middleware.showRequests);




// website root
router.get('/', function (req, res) {
    // render page and pass data
	res.render("index", {
        page: {
            title: 'Hello World!',
            image: 'https://picsum.photos/500/500',
            body: []
        }
    });
});

// api root
router.get('/api', async (req, res) => {
	res.json({
		message: "hello"
	});
});


// trails/city/state
router.get('/api/trails/:city?/:state?', async (req, res) => {
	console.log(req.params);

	// set vars
	let city = req.params.city,
		state = req.params.state,
		lat, lon,
		url = "https://nominatim.openstreetmap.org/search?city=" + city + "&state=" + state + "&format=json";

	console.log(url);

	// https://github.com/node-fetch/node-fetch
	const response = await fetch(url);
	const osm = await response.json();
	console.log(osm);
	// store lat / lon
	lat = osm[0].lat;
	lon = osm[0].lon;

	// respond to client
	res.json({
		city: city,
		state: state,
		lat: lat,
		lon: lon
	});

});


module.exports = router;
