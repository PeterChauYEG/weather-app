# [FreeCodeCamp: Coffee-and-Code - February 4 from 1:00 PM - 3:00 PM](https://www.meetup.com/startupedmonton/events/236854118/)

This month we're going to focus on CSS and JavaScript fundamentals.

1:00 - 2:00 PM - CSS workshop with Josh Nguyen, Varafy
2:00 - 3:00 PM - JavaScript workshop with Peter Chau, Pogo CarShare

Is there something specific you'd like covered? Let us know in the comments.

Requirements: Remember to bring your laptop.

https://www.meetup.com/startupedmonton/events/236854118/

## Weather Single Page App

### HTML/CSS Webpage
- Design:

  Before you begin writing code, it is always best to do some planning.

  Think about the information you want to see in your website and where it
  should live in the page. You can use mockup tools or an archaic analog mockup
  system like a whiteboard.

  Also consider the colors, fonts, layout.

- HTML and CSS:

  Convert your mockup into HTML and apply the designs with CSS.

- JavaScript:

  Consider making your website functional, making it useful to many users.

  We will make the icons and background dynamic with some basic JavaScript. The
  code will conditionally assign the weather icon and background based on
  weather code, provided by OpenWeatherMap.

  Use document.getElementById() to retrieve the HTML element from the DOM. You can
  apply styles and other attributes to the element, which will render to your page.

### JavaScript
- Get the user's location:
  Lets start by figuring out how we can grab a user's location from the web browser.

  To do so, let's consult some [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).

  The `Navigator.geolocation` property returns a Geolocation object that gives Web content access to the location of the device.

  ```
  geo = navigator.geolocation
  ```

  Using the Geolocation object, we can [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) which will get the current position of the device

  ```
  navigator.geolocation.getCurrentPosition(success[, error[, options]])
  ```

  Make sure you pass some [options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) for better results

- Getting the weather for the user's location
  We can use the [OpenWeatherMap API](https://openweathermap.org/api).

  Lets look at the [Current weather data documentation](http://openweathermap.org/current).

  Ok, it looks like we can get the weather by [geographic coordinates](http://openweathermap.org/current#geo).

  ```
  api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  ```

  You'll need to [attach your api key](http://openweathermap.org/appid) as well

  ```
  http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
  ```

- ajax
  We can use vanilla JavaScript to partially refresh the page and make a HTTP request.

  ```
  var request = new XMLHttpRequest();
  request.open('GET', '/my/url', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
  ```

- converting data

- rendering
  How do we use JavaScript to put data onto a HTML element?

  First, we need to grab the element. We can use [`element = document.getElementById(id)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) to do so.

  Next to modify it's contents by modifying it's innerHTML. We can use `element.innerHTML = element.innerHTML + data` to do so.
