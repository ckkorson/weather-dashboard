// let city = 'Knoxville'
// let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +',usa&units=imperial&APPID=dd267f7775731528762e4ab72ff77aef'
let searchBtn = document.getElementById('search-btn')

function getApi() {
    let city = document.getElementById('city-search').value
    console.log(city)
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +',usa&units=imperial&APPID=dd267f7775731528762e4ab72ff77aef'
    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data)
        console.log(data.name)
        currentWeather(data)
    })
}

function currentWeather(data) {
    document.getElementById('city').innerHTML = data.name
    document.getElementById('temp').innerHTML = 'Temp: ' + data.main.temp + '°F'
    document.getElementById('wind').innerHTML = 'Wind: ' + data.wind.speed + ' mph'
    document.getElementById('humidity').innerHTML = 'Humidity: ' + data.main.humidity + '%'
}

searchBtn.addEventListener('click', function(){
    getApi()
})