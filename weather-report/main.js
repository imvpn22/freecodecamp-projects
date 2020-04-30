let coords = {};
const temp_unit = ' \u00B0C';

const localStorage = window.localStorage;

const loadWeather = () => {
  coords = localStorage.getItem('location');

  if (coords === null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        coords = {};
        coords.lat = position.coords.latitude;
        coords.lon = position.coords.longitude;
        localStorage.setItem('location', JSON.stringify(coords));

        console.log('Taking location ');
        console.log(JSON.stringify(coords));

        // Add lattitude and logitude to url address
        requestAPI(constructAPIURL(coords));
      });
    } else {
      console.error('Unable to get coord');
    }
    return;
  }

  coords = JSON.parse(coords);

  // Add lattitude and logitude to url address
  requestAPI(constructAPIURL(coords));
};

constructAPIURL = (coords) => {
  const apiURL = 'https://fcc-weather-api.glitch.me/api/current?';
  return apiURL + 'lat=' + coords.lat + '&lon=' + coords.lon;
};

requestAPI = (apiURL) => {
  console.log(apiURL);

  fetch(apiURL)
    .then((res) => res.json())
    .then((result) => {
      localStorage.setItem('temperature', JSON.stringify(result));
      populateData(result);
    })
    .catch((err) => {
      console.error('Some error occured \n' + err);
    });
};

populateData = (result) => {
  if (!result) {
    return;
  }
  console.log(result);

  // populate the data
  document.getElementById('city').innerHTML = result['name'];

  document.getElementById('temp').innerHTML =
    Math.round(result['main']['temp']) + temp_unit;

  document.getElementById('temp_max').innerHTML =
    result['main']['temp_max'] + temp_unit;
  document.getElementById('temp_min').innerHTML =
    result['main']['temp_min'] + temp_unit;
  document.getElementById('humidity').innerHTML = result['main']['humidity'];
  document.getElementById('pressure').innerHTML = result['main']['pressure'];

  /*   document.getElementById('temp_img').innerHTML =
    '<img src="' + result['weather'][0]['icon'] + '"/>'; */

  document.getElementById('temp_cond').innerHTML = result['weather'][0]['main'];
};

window.onload = () => {
  // Call the function initially
  populateData();
  loadWeather();
};
