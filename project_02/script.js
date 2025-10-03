document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const errorMessage = document.getElementById("error-message")
    const cityNameDisplay = document.getElementById("city-name")
    const temperatureDisplay = document.getElementById("temperature")
    const descriptionDisplay = document.getElementById("description")

    const API_KEY = "2161a00cdde5f15bf6fd31809f295757"

    getWeatherBtn.addEventListener("click", async() => {
        const city = cityInput.value.trim()
        if (!city) return
        
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
        

    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        const response = await fetch(url)
        // console.log(typeof response);
        // console.log(response)

        if (!response.ok) throw new Error("error")
        
        const data = await response.json()
        // console.log(data)
        return data
    }


    function displayWeatherData(data) {
        console.log(data)
        const { name, main, weather } = data
        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `Temperatur : ${main.temp}`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
    }

    function showError() {
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
    }


})