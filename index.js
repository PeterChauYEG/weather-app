// define some test data
let data = "This is some test data";

// define geolocation options
const geoOptions = {

};

init();

// we are going to pass functions into functions
// we start by getting the geolocation
// then we get the weather using the previous
// finally
function init() {
  // Get the location

}

// get the user's geolocation
// takes options object
function getGeolocation(options) {

}

// on success
function geoSuccess(pos) {

}

// on error
function GeoError(err) {

}

// get weather data via http GET
// takes latitude and longitude
// finally we render it onto the screen
function getWeather(latitude, longitude) {

}

function renderWeatherData(data) {
	// Render the retreived data to the HTML DOM

	const weatherData = JSON.parse(data);


	// Get your HTML elements from the DOM in order to insert data
	// locationName
	// currentTemp
	// temp_max
	// temp_min
	// description

	// Insert data to DOM elements
	locationName.innerHTML = weatherData.name;
	// ...

	// Apply unique weather icons and background styles
	// based on various weather conditions
	getWeatherIconAndBG(weatherData.weather[0].id);

	return;
}

function getWeatherIconAndBG(weatherId) {
	// OpenWeather conveniently provides weather ID codes
	// to categorize weather events/groups.

	// We will use these ID codes to conditionally apply
	// unique icons and background images for improved
	// user experience.

	// ...

	switch(true) {
		// .....
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

  // ...

	return;
}
