var lat;
var lat1;
var lon;
var lon1;

// display current date
var currentDate = moment().format("MM/DD/YYYY");



// get the currentWeather and lattitue and longitude coordinates for city
$(".btn").on("click", function (event) {

    $("#cityName").text(currentDate);
    
    event.preventDefault();

    var city = $("#city").val();
     console.log(city);


    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#date").text(data.name);


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
            // console.log("Current temp is " + data.current.temp);
            var currTemp = document.querySelector('#temp');
            currTemp.innerHTML = "Temp: " + temp + "&#176;" + " F";

            // dis play current wind
            var wind = data.current.wind_speed
            // console.log("current wind speed is " + data.current.wind_speed)
            var currWind = document.querySelector('#wind');
            currWind.innerHTML = "Wind: " + wind + " MPH";

            // display current humdity
            var humid = data.current.humidity
            // console.log("current humidity is " + data.current.humidity)
            var currHumid = document.querySelector('#humid');
            currHumid.innerHTML = "Humidity: " + humid + " %";

            // display current uvi
            var uvi = data.current.uvi
            // console.log("current uvi is " + data.current.uvi)
            var currUvi = document.querySelector('#uv');
            currUvi.innerHTML = "UV Index: " + uvi;
        })
};

// five day forcast function

function fiveDay(lat1,lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 + '&lon=' + lon1 + '&units=imperial&exclude=minutely,hourly&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // loop through the 5 arrays of the 7 day forecast to display only 5 day forecast
            for (var i= 0; i < 5; i++){

            var call = document.querySelector(".column-" + i);

            // temperature forecast
            var forTemp = data.daily[i].temp.max;
            var displayTemp = document.createElement("div");
            displayTemp.innerHTML = "Temp: " + forTemp + "&#176;" + " F";

            // windspeed forecast
            var forWind = data.daily[i].wind_speed;
            var displayWind = document.createElement("div");
            displayWind.innerHTML = "Wind: " + forWind + " MPH";

            // humidity forecast
            var forHumid = data.daily[i].humidity;
            var displayHumid = document.createElement("div");
            displayHumid.innerHTML = "Humidity: " + forHumid + " %";

            call.appendChild(displayTemp);
            call.appendChild(displayWind);
            call.appendChild(displayHumid);
            }
        })
    
};





