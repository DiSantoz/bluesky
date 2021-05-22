var lat;
var lat1;
var lon;
var lon1;
// display current date
var currentDate = moment().format("MM/DD/YYYY");

$("#cityName").text(currentDate);

// get the currentWeather and lattitue and longitude coordinates for city
$(".btn").on("click", function (event) {

    
    event.preventDefault();

    var city = $("#city").val();
     console.log(city);

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.name);

            lat = (data.coord.lat);
            lat1 = lat.toString()
            console.log(lat1);

            lon = data.coord.lon;
            lon1 = lon.toString()
            console.log(lon1);

            // call coord and fiveday function
            coord(lat1, lon1)
            fiveDay(lat1, lon1);
        })

});

// function to display weather conditions of city based on lon and lat
function coord(lat1, lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 + '&lon=' + lon1 + '&units=imperial&exclude=minutely,hourly&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // display current temp 
            var temp = data.current.temp;
            console.log("Current temp is " + data.current.temp);
            var currTemp = document.querySelector('#temp');
            currTemp.innerHTML = temp + "&#176;" + " F";

            // dis play current wind
            var wind = data.current.wind_speed
            console.log("current wind speed is " + data.current.wind_speed)
            var currWind = document.querySelector('#wind');
            currWind.innerHTML = wind + " MPH";

            // display current humdity
            var humid = data.current.humidity
            console.log("current humidity is " + data.current.humidity)
            var currHumid = document.querySelector('#humid');
            currHumid.innerHTML = humid + " %";

            // display current uvi
            var uvi = data.current.uvi
            console.log("current uvi is " + data.current.uvi)
            var currUvi = document.querySelector('#uv');
            currUvi.innerHTML = uvi;
        })
};

// five day forcast function

function fiveDay(lat1,lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat1+ '&lon=' + lon1 + '&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list)
        })
};





