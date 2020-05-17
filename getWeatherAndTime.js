// Given an array of inputs (location name, postal code), log the current time and weather for those locations.

// the fetch api is used to fetch https requests
const fetch = require("node-fetch");

// const https = require('https');
const apiKey = "40468bc9c23beec2e5a6af80ceca0e10";


// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


	function getLocationType (location){

		// For simplicity I assume that zip codes will entered in a 5 number format
		const zipCodeRe = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

		if (zipCodeRe.test(location)){
			return "Zip";
		} else {
			return "Name";
		}

	}

	// Note: getWeatherAtOneLocation assumes location is a zip code or city name
	async function getWeatherAtOneLocation (location) {
		const locType = getLocationType(location);

		const weatherApiUrl = (locType=="Zip") 
			? `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${apiKey}` 
			: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

		try {
			let response = await fetch(weatherApiUrl);
			let weatherJson = await response.json();
			// console.log(weatherJson);
			let message = `It's ${weatherJson.main.temp} degrees Farenheit and ${weatherJson.weather[0].description} in ${weatherJson.name}\n`;
			console.log(message);
		} catch (error) {
			console.log(`Data for ${location} could not be found`);
		}

	}

	// locations.map(function)
	function getWeatherForAll (locations) {
		console.log(locations.map(getWeatherAtOneLocation));


	}

	const testLocations_1 = ["94087", "21401", "37086", "2"];
	const testLocations_2 =["New York", "10005", "Tokyo", "Sao Paulo", "Pluto"];
	const testLocations_3 = ["94087"];

	getWeatherForAll(testLocations_3);


