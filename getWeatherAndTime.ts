// Given an array of inputs (location name, postal code), log the current time and weather for those locations.

// the fetch api is used to fetch https requests
const fetchUrl = require("node-fetch");

const apiKey:string = "40468bc9c23beec2e5a6af80ceca0e10";


function getLocationType (location:string){ 
	const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

	if (zipCodeRegex.test(location)){
		return "Zip";
	} else {
		return "Name";
	}

}

// Note: getWeatherAtOneLocation assumes location is a zip code or city name
async function getWeatherAtOneLocation (location:string) {
	const locType = getLocationType(location);

	const weatherApiUrl = (locType=="Zip") 
		? `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${apiKey}` 
		: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

	try {
		const response = await fetchUrl(weatherApiUrl);
		const weatherJson = await response.json();
		
		// make sure that the unix formatted date is an integer
		const localUnixDate = parseInt(weatherJson.dt);
		const localTimeOffset = parseInt(weatherJson.timezone);

		const currentDate = new Date(); 
		const dateInUtcSeconds = (currentDate.getTime()+6*60*60*1000)/1000;

		const localDateSeconds = dateInUtcSeconds+localTimeOffset;

		const localDate = new Date(0); 
		localDate.setUTCSeconds(localDateSeconds);

		const message = `It's ${weatherJson.main.temp} degrees Farenheit and ${weatherJson.weather[0].description} in ${weatherJson.name} and the time is ${localDate.getHours()}:${localDate.getMinutes()}:${localDate.getSeconds()}\n`;
		console.log(message);

	} catch (error) {
		// console.error(error);
		console.log(`Data for ${location} could not be found`);
	}

}

function getWeatherForAll (locations:string[]) {
	console.log(locations.map(getWeatherAtOneLocation));
}

// test all zip codes
const testLocations_1:string[]= ["94087", "21401", "37086"];
// test mix of zip codes and city names
const testLocations_2:string[] = ["New York", "10005", "Tokyo", "Sao Paulo", "Pluto"];
// test mix of valid and invalid zip codes
const testLocations_3:string[] = ["21401", "2"];
// test empty input array
const testLocations_4:string[] = [];
// test invalid city name
const testLocations_5:string[] = ["aaaaaaaaaaaaaaaaaa"];

getWeatherForAll(testLocations_1);
getWeatherForAll(testLocations_2);
getWeatherForAll(testLocations_3);
getWeatherForAll(testLocations_4);
getWeatherForAll(testLocations_5);


