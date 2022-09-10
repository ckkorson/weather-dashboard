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
        // console.log(data.name)
        currentWeather(data)
        let cityLat = data.coord.lat
        let cityLon = data.coord.lon
        weatherForecast(cityLat,cityLon)
    })
}

function currentWeather(data) {
    let weatherImg = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
    document.getElementById('city').innerHTML = data.name
    document.getElementById('city-img').setAttribute('src', weatherImg)
    // let cityTemp = Math.round(data.main.temp)
    // let cityTempArr = cityTemp.split(".")
    document.getElementById('temp').innerHTML = 'Temp: ' + Math.round(data.main.temp) + '°F'
    document.getElementById('wind').innerHTML = 'Wind: ' + Math.round(data.wind.speed) + ' mph'
    document.getElementById('humidity').innerHTML = 'Humidity: ' + data.main.humidity + '%'
    document.getElementById('feels-like').innerHTML = 'Feels like: ' + Math.round(data.main.feels_like) + '°F'
}

function weatherForecast(cityLat,cityLon) {
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=dd267f7775731528762e4ab72ff77aef'
    fetch(forecastUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

searchBtn.addEventListener('click', function(){
    getApi()
})

getApi()