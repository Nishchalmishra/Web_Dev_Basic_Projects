document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input")
    const weatherInfo = document.getElementById("weather-info")
    const getWeatherButton = document.getElementById("get-weather-btn")
    const cityName = document.getElementById("city-name")
    const temperaturDisplay = document.getElementById("temperature")
    const descriptionDisplay = document.getElementById("description")
    const errorMessage = document.getElementById("error-message")

    const API_KEY = "2161a00cdde5f15bf6fd31809f295757"

    getWeatherButton.addEventListener("click", async() => {
        const city = cityInput.value.trim()
        if (!city) return
        
        try {
            const data = await fetchWeatherData(city)
            displayData(data)
        } catch (error) {
            errorDisplay()
        }
    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        const response = await fetch(url)
        if(!response.ok) throw new Error("NOT FOUND")
        const data = await response.json()

        return data
    }

    function displayData(data) {

        console.log(data)
        const {name, main, weather} = data
        cityName.textContent = name
        temperaturDisplay.textContent = `Temperature : ${main.temp}`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
        
    }

    function errorDisplay() {
        weatherInfo.classList.add("hidden")
        errorMessage.classList.remove("hidden")
    }

})