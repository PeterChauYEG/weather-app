// define some test data
let data = "This is some test data";

// define geolocation options
const geoOptions = {
	enableHighAccuracy: true,
	timeout: 10000, // in ms so 10 seconds
	maximumAge: 0
};

init();

// we are going to pass functions into functions
// we start by getting the geolocation
// then we get the weather using the previous
// finally
function init() {
  // Get the location
  getGeolocation(geoOptions);
}

// get the user's geolocation
// takes options object
function getGeolocation(options) {
	// make sure geolocation is supported
	if (!navigator.geolocation) {
		return "Geolocation is not supported by your browser";
	}

	// get the geolocation
	navigator.geolocation.getCurrentPosition(geoSuccess, GeoError, options);
}

// on success
function geoSuccess(pos) {
	// RenderData(`Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`);

	// get the weather
	getWeather(pos.coords.latitude, pos.coords.longitude);
}

// on error
function GeoError(err) {
	RenderData({"error": "No Data Received"});
}

// get weather data via http GET
// takes latitude and longitude
// finally we render it onto the screen
function getWeather(latitude, longitude) {
	// create request
	let request = new XMLHttpRequest();

	// define endpoint
	const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3e3fc59ab891338262ec5c0baf66faca&units=metric`;
	// const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=Edmonton,ca&APPID=3e3fc59ab891338262ec5c0baf66faca&units=metric`;

	request.open('GET', endpoint, true);

	request.onload = function() {

		const response = request.responseText;

		if (request.status >= 200 && request.status < 400) {

			// success
			renderWeatherData(response);

		} else {

			// server error
			RenderData(`Error: ${response}`);
		}
		return
	}

	request.onerror = function() {
		const response = request.responseText;

		// connection error
		RenderData(`Error: ${response}`);
	}

	request.send();
}

function getWeatherIconAndBG(weatherId) {
	// OpenWeather conveniently provides weather ID codes
	// to categorize weather events/groups.

	// We will use these ID codes to conditionally apply
	// unique icons and background images for improved
	// user experience.

	const weatherIconElement = document.getElementById('weatherIcon');
	const body = document.body;

	let weatherIcon = '';
	let bodyColor = '';

	switch(true) {
		case weatherId >= 200 && weatherId <= 232:
			bodyColor = 'darkGrey';
			weatherIcon = 'wi wi-thunderstorm';
			break;
		case weatherId >= 300 && weatherId <= 321:
			bodyColor = 'gentleRain';
			weatherIcon = 'wi wi-showers';
			break;
		case weatherId >= 500 && weatherId <= 531:
			bodyColor = 'sadBlue';
			weatherIcon = 'wi wi-rain';
			break;
		case weatherId >= 600 && weatherId <= 622:
			bodyColor = 'bleakWasteland';
			weatherIcon = 'wi wi-snow';
			break;
		case weatherId >= 701 && weatherId <= 781:
			bodyColor = 'cantSee';
			weatherIcon = 'wi wi-dust';
			break;
		case weatherId === 800:
			bodyColor = "sunny";
			weatherIcon = 'wi wi-day-sunny';
			break;
		case weatherId === 801:
			bodyColor = 'partylCloudy';
			weatherIcon = 'wi wi-day-cloudy';
			break;
		case weatherId >= 802 && weatherId <= 804:
			bodyColor = "cloudy";
			weatherIcon = 'wi wi-cloudy';
			break;
		default:
			bodyColor = "sunny";
			weatherIcon = 'wi wi-day-sunny';
			break;
	}

	weatherIconElement.className = weatherIcon;
	body.className = bodyColor;

	return;
}

function renderWeatherData(data) {
	// Render the retreived data to the HTML DOM

	const weatherData = JSON.parse(data);


	// Get your HTML elements from the DOM in order to insert data
	const locationName = document.getElementById('locationName');
	const currentTemp = document.getElementById('currentTemp');
	const temp_max = document.getElementById('temp_max');
	const temp_min = document.getElementById('temp_min');
	const description = document.getElementById('description');

	// Insert data to DOM elements
	locationName.innerHTML = weatherData.name;
	currentTemp.innerHTML = Math.round(weatherData.main.temp) || weatherData.error;
	temp_max.innerHTML = weatherData.main.temp_max;
	temp_min.innerHTML = weatherData.main.temp_min;
	description.innerHTML = weatherData.weather[0].description;

	// Apply unique weather icons and background styles
	// based on various weather conditions
	getWeatherIconAndBG(weatherData.weather[0].id);

	return;
}

// renders data onto the screen (#data) for testing purposes only
// string data Takes the data you want to render
function RenderData(data) {
	// grab the target element
	let dataElement = document.getElementById("data");

	// now modify the element's inner html
	// append the data variable

	dataElement.innerHTML = JSON.parse(data);
}
