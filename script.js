const cityInput = document.querySelector(".form-input")
const searchButton = document.querySelector(".search-button")
const forecastContainer = document.querySelector("#forecast")
const history = document.querySelector("#history")

searchButton.addEventListener("click", function(event){
    event.preventDefault()
    presentCityWeather()
})


function presentCityWeather () {
    const todayWeatherInfo = document.querySelector("#today")

    const city = cityInput.value

    const queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=31&appid=b6df7b967beb80abb633a6a62f9fcf41"
    
    fetch(queryUrl)
    .then((res) => res.json())
    .then(function(data){ 

    const weatherIcon = document.createElement("img")
    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon +"@2x.png"

    const cityHeader = document.createElement("h1")
    cityHeader.textContent = data.city.name + " " + dayjs().format("(DD/MM/YYYY)") + " "
    cityHeader.appendChild(weatherIcon)
    todayWeatherInfo.innerHTML = ""
    todayWeatherInfo.appendChild(cityHeader)

    const cityTemp = document.createElement("p")
    cityTemp.textContent = "Temp: " + Math.floor(data.list[0].main.temp - 273.15) + "°C"

    const cityWind = document.createElement("p")
    cityWind.textContent = "Wind: " + Math.floor(data.list[0].wind.speed) + " KPH"

    const cityHumidity = document.createElement("p")
    cityHumidity.textContent = "Humidity: " + Math.floor(data.list[0].main.humidity) + "%"

    todayWeatherInfo.append(cityTemp, cityWind, cityHumidity)

    forecastContainer.innerHTML = ""

    let currentDate = true;
    
    console.log(data)

    for (let i = 0; i < data.list.length; i++) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt_txt.split(" ")[0]);


        if (currentDate === true || forecastDate.getDate() !== currentDate.getDate()) {
            
            const forecastTitle = document.createElement("h2")
            forecastTitle.textContent = dayjs(forecast.dt_txt).format("MMMM D YYYY");

            const forecastImage = document.createElement("img")
            forecastImage.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon +"@2x.png"

            const forecastTemp = document.createElement("p")
            forecastTemp.textContent = "Temperature: " + Math.floor(data.list[i].main.temp - 273.15) + "°C"

            const forecastWind = document.createElement("p")
            forecastWind.textContent = "Wind: " + Math.floor(data.list[i].wind.speed) + " KPH"

            const forecastHumidity = document.createElement("p")
            forecastHumidity.textContent = "Humidity: " + Math.floor(data.list[i].main.humidity) + "%"

            const forecastDiv = document.createElement("div")
            forecastDiv.append(forecastTitle, forecastImage, forecastTemp, forecastWind, forecastHumidity);
            forecastContainer.append(forecastDiv);
            
            currentDate = forecastDate;
        }
    }
    if (cityInput.value === "") {
        return;
    } else {
        const cityName = cityInput.value;
    
        const existingButton = document.querySelector(`#history button[data-city="${cityName}"]`);
        if (!existingButton) {
            const cityButton = document.createElement("button");
            cityButton.textContent = cityName;
            cityButton.setAttribute("data-city", cityName);
            history.appendChild(cityButton);
    
            cityButton.addEventListener("click", function(event){
                cityInput.value = cityName;
                presentCityWeather();
            });
        }
    }
})
}
