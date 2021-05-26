var lat;
var lat1;
var lon;
var lon1;

// display current date
var currentDate = moment().format("MM/DD/YYYY");
var newCityArr = localStorage.getItem("city") ? JSON.parse(localStorage.getItem("city")) : []

// empty out container
var hist = document.getElementById('history')
hist.innerHTML = "";

// for loop to display contents of array
for (let i = 0; i < newCityArr.length; i++) {
    var retrievedCity = document.createElement("button");
    retrievedCity.setAttribute("class", "cityHistory")
    retrievedCity.innerHTML = newCityArr[i];
    retrievedCity.addEventListener("click", function () {
        getCity(newCityArr[i]);
    })
    hist.appendChild(retrievedCity);
};

// on click, display current date and City Name and store city name
$(".btn").on("click", function (event) {

    $("#date").text("(" + currentDate + ")");

    event.preventDefault();

    var city = $("#city").val();
    console.log(city);

    // store city name in local storage
    if (city) {
        newCityArr.push(city);
        var retrievedCity = document.createElement("button");
        retrievedCity.setAttribute("class", "cityHistory")
        retrievedCity.innerHTML = city;
        retrievedCity.addEventListener("click", function () {
            getCity(city);
        })
        hist.appendChild(retrievedCity);
        localStorage.setItem("city", JSON.stringify(newCityArr));
        getCity(city);
    }

});

// GET THE CURRENTWEATHER AND  LATTITUDE AND LONGITUDE COORDINATES FOR CITY
function getCity(city) {
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#cityName").text(data.name);

            // display current weather icon
            var currentIcon = data.weather[0].icon;
            var iconLink = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
            $('#con').attr('src', iconLink);

            lat = (data.coord.lat);
            lat1 = lat.toString()

            lon = data.coord.lon;
            lon1 = lon.toString()

            // call coord and fiveday function
            coord(lat1, lon1)
            fiveDay(lat1, lon1);
        })
}

// FUNCTION TO DISPLAY WEATHER CONDITIONS OF CITY BASED ON LON AND LAT
function coord(lat1, lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 + '&lon=' + lon1 + '&units=imperial&exclude=minutely,hourly&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // display current temp 
            var temp = data.current.temp;
            var currTemp = document.querySelector('#temp');
            currTemp.innerHTML = "Temp: " + temp + "&#176;" + " F";

            // dis play current wind
            var wind = data.current.wind_speed
            var currWind = document.querySelector('#wind');
            currWind.innerHTML = "Wind: " + wind + " MPH";

            // display current humdity
            var humid = data.current.humidity
            var currHumid = document.querySelector('#humid');
            currHumid.innerHTML = "Humidity: " + humid + " %";

            // display current uvi
            var uvi = data.current.uvi
            var currUvi = document.querySelector('#uv');
            currUvi.innerHTML = "UV Index: " + "<span id='uvIndex'>" + uvi + "</span";

            // checks if uvi is  favorable, moderate, or severe

            //if uvi between 0-2: favorable
            if (uvi <= 2.00) {
                $("#uvIndex").css("background-color", "green");
                $("#uvIndex").css("color", "white");
                $("#uvIndex").css("border-radius", "5px");
                // if uvi between 3-7.99: moderate
            } else if (uvi <= 7.99) {
                $("#uvIndex").css("background-color", "orange");
                $("#uvIndex").css("color", "white");
                $("#uvIndex").css("border-radius", "5px");
                // if uvi above 8: severe
            } else if (uvi >= 8.00) {
                $("#uvIndex").css("background-color", "red");
                $("#uvIndex").css("color", "white");
                $("#uvIndex").css("border-radius", "5px");
            };
        })
};

// FIVE DAY FORECAST FUNCTION
function fiveDay(lat1, lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 + '&lon=' + lon1 + '&units=imperial&exclude=minutely,hourly&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // loop through the 5 arrays of the 7 day forecast to display only 5 day forecast
            for (var i = 0; i < 5; i++) {

                var call = document.querySelector("#column-" + i);
                $("#column-" + i).empty();
                //  forecast time
                var t = data.daily[i].dt
                var forTime = moment.unix(t).format("MM/DD/YYYY");
                var displayTime = document.createElement("div");
                displayTime.innerHTML = forTime;

                // forecast weather icon
                var forIcon = data.daily[i].weather[0].icon;
                var forIconEl = document.createElement("img");
                forIconEl.setAttribute("id", "forcon")
                var forIconLink = "http://openweathermap.org/img/wn/" + forIcon + ".png";
                $(forIconEl).attr('src', forIconLink);

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

                //append each variable 
                call.appendChild(displayTime);
                call.appendChild(forIconEl);
                call.appendChild(displayTemp);
                call.appendChild(displayWind);
                call.appendChild(displayHumid);
            }
        })
};

