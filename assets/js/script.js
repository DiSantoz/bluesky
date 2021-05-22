var lat;
var lat1;
var lon;
var lon1;

function currentWeather() {
    
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            lat = (data.coord.lat);
            lat1= lat.toString()
            console.log(lat1);

            lon = data.coord.lon;
            lon1= lon.toString()
            console.log(lon1);
            
            console.log(coord(lat1, lon1));
        })

};

function coord(lat1,lon1) {

    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 + '&lon=' + lon1 + '&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })

};

currentWeather();
coord();