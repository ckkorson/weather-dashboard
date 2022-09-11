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
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=dd267f7775731528762e4ab72ff77aef'
    fetch(forecastUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        for(let i = 0; i < 5; i++) {
            let num = i + 1
            let dayId = 'day-' + num
            let iconId = 'icon-' + num
            let day = i * 8
            let weatherImg = 'http://openweathermap.org/img/wn/' + data.list[day+4].weather[0].icon + '.png'
            console.log(weatherImg)
            document.getElementById(dayId).innerHTML = moment(data.list[day].dt_txt).format('ddd')
            document.getElementById(iconId).setAttribute('src', weatherImg)
            dailyTemp(data, day, num)
            windSpeed(data, day, num)
            humidityRange(data, day, num)
        }
    })
}

function dailyTemp(data, day, num) {
    let tempArr = []
    let highTemp = -1000
    let lowTemp = 1000
    for(let j = day; j < day + 8; j++) {
        tempArr.push(data.list[j].main.temp)
    }
    for(let j = 0; j < tempArr.length; j++) {
        if(highTemp < tempArr[j]) {
            highTemp = tempArr[j]
        }
        if(lowTemp > tempArr[j]) {
            lowTemp = tempArr[j]
        }
    }
    let highId = 'high-' + num
    let lowId = 'low-' + num
    // console.log(highId)
    // console.log(highTemp)
    document.getElementById(highId).innerHTML = 'High: ' + Math.round(highTemp) + '°F'
    document.getElementById(lowId).innerHTML = 'Low: ' + Math.round(lowTemp) + '°F'
}

function windSpeed(data, day, num) {
    let windArr = []
    let highWind = -1000
    let lowWind = 1000
    for(let j = day; j < day + 8; j++) {
        windArr.push(data.list[j].wind.speed)
    }
    for(let j = 0; j < windArr.length; j++) {
        if(highWind < windArr[j]) {
            highWind = windArr[j]
        }
        if(lowWind > windArr[j]) {
            lowWind = windArr[j]
        }
    }
    let windId = 'wind-' + num
    document.getElementById(windId).innerHTML = 'Wind: ' + Math.round(lowWind) + '-' + Math.round(highWind) + 'mph'
}

function humidityRange(data, day, num) {
    let humidArr = []
    let highHumid = -1000
    let lowHumid = 1000
    for(let j = day; j < day + 8; j++) {
        humidArr.push(data.list[j].main.humidity)
    }
    for(let j = 0; j < humidArr.length; j++) {
        if(highHumid < humidArr[j]) {
            highHumid = humidArr[j]
        }
        if(lowHumid > humidArr[j]) {
            lowHumid = humidArr[j]
        }
    }
    let humidId = 'humidity-' + num
    document.getElementById(humidId).innerHTML = 'Humidity: ' + Math.round(lowHumid) + '-' + Math.round(highHumid) + '%'
}

searchBtn.addEventListener('click', function(){
    getApi()
})

getApi()