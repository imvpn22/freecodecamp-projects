// $.ajaxSetup({ cache: false });


var coords = {}
var result = {}
var temp_unit = ' \u00B0C'

const localStorage = window.localStorage

var loadWeather = () => {
    coords = localStorage.getItem('location')

    if (coords === null) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                coords = {}
                coords.lat = position.coords.latitude
                coords.lon = position.coords.longitude
                localStorage.setItem('location', JSON.stringify(coords))

                console.log('Taking location ')
                console.log(JSON.stringify(coords))

                // Add lattitude and logitude to url address
                requestAPI(constructAPIURL(coords))
            })
        } else {
            console.error('Unable to get coord')
        }
        return    
    }
    
    coords = JSON.parse(coords)

    // Add lattitude and logitude to url address
    requestAPI(constructAPIURL(coords))

}

var constructAPIURL = (coords) => {
    var apiURL = 'https://fcc-weather-api.glitch.me/api/current?'
    return apiURL + 'lat=' + coords.lat + '&lon=' + coords.lon
}

var requestAPI = (apiURL) => {
    console.log(apiURL)
    $.ajax({
        url: apiURL, 
        success: (result) => {
            localStorage.setItem('temperature', JSON.stringify(result))
            populateData()
        },
        error: (err) => {
            console.error('Some error occured \n' + err)
        }
    })
}

var populateData = () => {

    var result = localStorage.getItem('temperature')
    if (result === null) {
        return
    }
    result = JSON.parse(result)
    
    
    console.log(result)

    // populate the data
    $('#city').text(result['name'])
    $('#temp').text(Math.round(result['main']['temp']) + temp_unit)
    $('#temp_max').text(result['main']['temp_max'] + temp_unit)
    $('#temp_min').text(result['main']['temp_min'] + temp_unit)
    $('#humidity').text(result['main']['humidity'])
    $('#pressure').text(result['main']['pressure'])

    $('#temp_img').html( '<img src="' + result['weather'][0]['icon'] + '"/>')
    $('#temp_cond').html(result['weather'][0]['main'])


}



window.onload = () => {
    // Call the function initially
    populateData()
    loadWeather()
};




