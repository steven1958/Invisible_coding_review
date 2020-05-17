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

			const latitude = weatherJson.coord.lat;
			const longitude = weatherJson.coord.lon;
			
			// make sure that the unix formatted date is an integer
			const localUnixDate = parseInt(weatherJson.dt);
			const localTimeOffset = parseInt(weatherJson.timezone);

			// Create a new JavaScript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds.
			// var date = new Date(localUnixDate * 1000);
			// // Hours part from the timestamp
			// var hours = date.getHours();
			// // Minutes part from the timestamp
			// var minutes = "0" + date.getMinutes();
			// // Seconds part from the timestamp
			// var seconds = "0" + date.getSeconds();

			// // Will display time in 10:30:23 format
			// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
			// console.log(formattedTime);

			var currentDate = new Date(); 
			var dateInUtcSeconds = (currentDate.getTime())/1000;

			var localDateSeconds = dateInUtcSeconds+localTimeOffset;

			var localDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
			localDate.setUTCSeconds(localDateSeconds);


			console.log(localDate);



			// var date = new Date(); 
			




		} catch (error) {
			console.error(error);
			// console.log(`Data for ${location} could not be found`);
		}

	}

	// locations.map(function)
	function getWeatherForAll (locations) {
		console.log(locations.map(getWeatherAtOneLocation));


	}

	const testLocations_1 = ["94087", "21401", "37086", "2"];
	const testLocations_2 = ["New York", "10005", "Tokyo", "Sao Paulo", "Pluto"];
	const testLocations_3 = ["21401"];
	const testLocations_4 = [];
	const testLocations_5 = ["Narnia"];

	getWeatherForAll(testLocations_3);


