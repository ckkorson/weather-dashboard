// let city = 'Knoxville'
// let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +',usa&units=imperial&APPID=dd267f7775731528762e4ab72ff77aef'
let searchBtn = document.getElementById('search-btn')
let listTracker = 0

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
        // recordSearch(data)
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
            let dayId = 'day-' + i
            document.getElementById(dayId).innerHTML = moment().add(i + 1, 'days').format('ddd')
            dailyForecast(data, i, dayId)
            // console.log(listTracker)
        }
        // for(let i = 0; i < data.list.length; i++) {
        //     let num = i + 1
        //     let dayId = 'day-' + num
        //     let iconId = 'icon-' + num
        //     let day = i * 8
        //     let weatherImg = 'http://openweathermap.org/img/wn/' + data.list[day+4].weather[0].icon + '.png'
        //     // console.log(weatherImg)
        //     document.getElementById(dayId).innerHTML = moment(data.list[day].dt_txt).format('ddd')
        //     document.getElementById(iconId).setAttribute('src', weatherImg)
        //     dailyTemp(data, day, num)
        //     windSpeed(data, day, num)
        //     humidityRange(data, day, num)
        // }
    })
}

function dailyForecast(data, i, dayId) {
    let indexArr = []
    for(let j = listTracker; j < data.list.length; j++) {
        // console.log(document.getElementById(dayId).innerHTML)
        // console.log(moment(data.list[j].dt_text).format('ddd'))
        // console.log(data.list[j].dt_txt)
        if(moment(data.list[j].dt_txt).format('ddd') == document.getElementById(dayId).innerHTML) {
            indexArr.push(j)
        }
        // else if(moment(data.list[j].dt).format('ddd') > document.getElementById(dayId).innerHTML) {
        //     listTracker = j
        //     return listTracker
        // }
    }
    console.log(indexArr)
    dailyTemp(data, i, indexArr)
    windSpeed(data, i, indexArr)
    humidityRange(data, i, indexArr)
    let iconId = 'icon-' + i
    let weatherImg = 'http://openweathermap.org/img/wn/' + data.list[indexArr[4]].weather[0].icon + '.png'
    document.getElementById(iconId).setAttribute('src',weatherImg)
}

function dailyTemp(data, i, indexArr) {
    let tempArr = []
    let highTemp = -1000
    let lowTemp = 1000
    for(let j = 0; j < indexArr.length; j++) {
        tempArr.push(data.list[indexArr[j]].main.temp)
    }
    for(let j = 0; j < tempArr.length; j++) {
        if(highTemp < tempArr[j]) {
            highTemp = tempArr[j]
        }
        if(lowTemp > tempArr[j]) {
            lowTemp = tempArr[j]
        }
    }
    let highId = 'high-' + i
    let lowId = 'low-' + i
    document.getElementById(highId).innerHTML = 'High: ' + Math.round(highTemp) + '°F'
    document.getElementById(lowId).innerHTML = 'Low: ' + Math.round(lowTemp) + '°F'
}

function windSpeed(data, i, indexArr) {
    let windArr = []
    let highWind = -1000
    let lowWind = 1000
    for(let j = 0; j < indexArr.length; j++) {
        windArr.push(data.list[indexArr[j]].wind.speed)
    }
    for(let j = 0; j < windArr.length; j++) {
        if(highWind < windArr[j]) {
            highWind = windArr[j]
        }
        if(lowWind > windArr[j]) {
            lowWind = windArr[j]
        }
    }
    let windId = 'wind-' + i
    document.getElementById(windId).innerHTML = 'Wind: ' + Math.round(lowWind) + '-' + Math.round(highWind) + 'mph'
}

function humidityRange(data, i, indexArr) {
    let humidArr = []
    let highHumid = -1000
    let lowHumid = 1000
    for(let j = 0; j < indexArr.length; j++) {
        humidArr.push(data.list[indexArr[j]].main.humidity)
    }
    for(let j = 0; j < humidArr.length; j++) {
        if(highHumid < humidArr[j]) {
            highHumid = humidArr[j]
        }
        if(lowHumid > humidArr[j]) {
            lowHumid = humidArr[j]
        }
    }
    let humidId = 'humidity-' + i
    document.getElementById(humidId).innerHTML = 'Humidity: ' + Math.round(lowHumid) + '-' + Math.round(highHumid) + '%'
}

function initialCities() {
    for(let i = 0; i < 5; i++) {
        let cityId = 'city-' + i
        let cityKey = 'city-' + i
        // console.log(window.localStorage.getItem(cityKey))
        if (window.localStorage.getItem(cityKey) != null) {
            document.getElementById(cityId).innerHTML = window.localStorage.getItem(cityKey)
        }
    }
    if (window.localStorage.getItem('city-0') != null) { 
        document.getElementById('city-search').value = window.localStorage.getItem('city-0')
    }
}

function recordSearch(data) {
    setCities()
    document.getElementById('city-0').innerHTML = document.getElementById('city-search').value
    for(let i = 1; i < 5; i++) {
        let num = i - 1
        let cityKey = 'city-' + num
        let cityId = 'city-' + i
        document.getElementById(cityId).innerHTML = window.localStorage.getItem(cityKey)
    }
    setCities()
}

function setCities() {
    for(let i = 0; i < 5; i++) {
        let cityKey = 'city-' + i
        let cityId = 'city-' + i
        window.localStorage.setItem(cityKey,document.getElementById(cityId).innerHTML)
    }
}

searchBtn.addEventListener('click', function(){
    getApi()
    recordSearch()
})

for(i = 0; i < 5; i++) {
    let oldCityBtn = 'city-' + i
    document.getElementById(oldCityBtn).addEventListener('click', function(target) {
        document.getElementById('city-search').value = document.getElementById(oldCityBtn).innerHTML
        getApi()
        recordSearch()
    })
}
initialCities()
getApi()