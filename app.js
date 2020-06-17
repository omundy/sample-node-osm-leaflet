"use strict";

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// root
app.get('/', function (req, res) {
	res.send('Hello World!');
});

// api root
app.get('/api', async (req, res) => {
	res.json({
		message: "hello"
	});
});


// trails/city/state
app.get('/api/trails/:city?/:state?', async (req, res) => {
	console.log(req.params);

	let city = req.params.city,
		state = req.params.state,
		lat, lon;

	let url = "https://nominatim.openstreetmap.org/search?city=" + city + "&state=" + state + "&format=json";
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
