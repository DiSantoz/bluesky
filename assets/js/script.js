fetch (
    'https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=8f4b5fb79bf55ca4186b297ac79fb394'
)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })