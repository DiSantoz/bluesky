var lat;
var lon;

function currentWeather (){
    // var cityName = document.getElementById = ('#city').value
    fetch (
        'https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);

            lat = data.coord.lat;
            console.log(data.coord.lat);
            lon = data.coord.lon;
            console.log(data.coord.lon);
        });        
}

function getCorrd(){ 
fetch (
        'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=8f4b5fb79bf55ca4186b297ac79fb394'
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("data returned from lat & lon " + data);
    })
}
currentWeather();
getCorrd();