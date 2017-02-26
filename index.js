// -------------------- DATA DEFINITIONS

// location data
const locations = [
	{
		cityName: 'Edmonton',
		countryCode: 'ca',
	},
]

const initialWeather = {
	main: {
		temp: '-5',
		temp_max: 'HIGH',
		temp_min: 'LOW',
	},
	name: 'Current Location',
	weather: [
		{
			description: 'Maybe rainy, maybe sunny',
			id: 200,
		},
	],
}

// -------------------- MAIN FUNCTIONS

/**
 * initialization function to be run on page load.
 * 
 * 
 * @param 	[object]	locations	set of cityNames and countryCodes
 * @return	null
 */
function init(locations) {
	
	// deconstruct location data
	const {cityName, countryCode} = locations[0]
	
	// render fake date initial state
	renderWeatherData(initialWeather)
	
	// get the weather
	getWeather(cityName, countryCode)

}

/**
 * renders weather data.
 * 
 * @param  object  data  weather data from api
 * @return null
 */
function renderWeatherData(data) {
	
	// convert string response into JSON
	const weatherData = data;
	
	// decontruct response 
	const {
		main: {
			temp,
			temp_max,
			temp_min,
		},
		name,
		weather,
	} = weatherData
	
	const { 
		description,
		id,
	} = weather[0]
	
	// render data into elements by id
	RenderDataById(name, 'locationName');
	RenderDataById(temp, 'currentTemp');
	RenderDataById(temp_max, 'temp_max');
	RenderDataById(temp_min, 'temp_min');
	RenderDataById(description, 'description');


	// get weather icons and background classNames
	const {
		bodyColor,
		weatherIcon,
	} = getWeatherIconAndBG(id);

	// based on various weather conditions
	// render icon and body color
	ChangeClassNameById(weatherIcon, 'weatherIcon')
	document.body.className = bodyColor;

	return;
}


// -------------------- API FUNCTIONS

/**
 * get weather data via http GET.
 * 
 * @param 	string	cityName name of a city
 * @param 	string	countryCode a ISO 3166 country code
 * @return	null
 */
function getWeather(cityName, countryCode) {
	// create request
	let request = new XMLHttpRequest();

	// define endpoint
	const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=522a1061f190c2aecc329e7f75a1fea9&units=metric`;

	request.open('GET', endpoint, true);

	request.onload = function() {

		const response = request.responseText;

		if (request.status >= 200 && request.status < 400) {

			// success
			// convert response into JSON
			const data = JSON.parse(response)
			
			// render weather data
			renderWeatherData(data);

		} else {

			// handle server error
			RenderDataById(`Error: ${response}`, 'data');
		}
		return
	}

	request.onerror = function() {
		const response = request.responseText;

		// handle connection error
		RenderDataById(`Error: ${response}`, 'data');
	}

	request.send();
}


// -------------------- HELPER FUNCTIONS

/**
 * grabs an element by id and renders data into it
 * 
 * @params	string or int	data	data to be rendered
 * @params	string				id		id of the element to be rendered into
 * @return	null
 */
function RenderDataById(data, id) {

	// grab the target element
	let element = document.getElementById(id)

	// modify the element's inner html
	element.innerHTML = data
}

/**
 * grabs an element by id and changes it's className
 * 
 * @params	string	className	className to be changed to
 * @params	string	id				id of the element to be rendered into
 * @return	null
 */
function ChangeClassNameById(className, id) {

	// grab the target element
	const element = document.getElementById(id)

	// modify the element's inner html
	element.className = className
}


/**
 * converts a weatherId into classNames for weatherIcon and body.
 * 
 * @param 	int				weatherId		the id of the weather as per OpenWeather API
 * @returns {string}	classNames	for weatherIcon and body
 * 
 */
function getWeatherIconAndBG(weatherId) {
	// OpenWeather conveniently provides weather ID codes
	// to categorize weather events/groups.

	// We will use these ID codes to conditionally apply
	// unique icons and background images for improved
	// user experience.
	let bodyColor = '';
	let weatherIcon = '';

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

	// aggergate results
	const result = {
		weatherIcon,
		bodyColor,
	}

	// return the result
	return result
}
