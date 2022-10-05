let API_KEY = "e22deec83e0b531395b2ff97da63013d";
const COUNTRY_URL = "http://api.openweathermap.org/geo/1.0/direct?"
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&"


const options = {
    method: 'GET',
};

// new Promise((resolve,reject)=>{})

// Using fetch /then

// const getCityData = (city) => {
//     let City_COORDINATES_URL = `${COUNTRY_URL}q=${city}&limit=1&appid=${API_KEY}`
//     fetch(City_COORDINATES_URL, options)
//         .then(response => response.json())
//         .then(response =>{
//             getWeatherData(response[0].lon,response[0].lat)
//         })
//         .catch(err => console.log(err));
// }

// Using async / await
// async on function 
// await for everthing that we want to wait for
const getCityData = async (city) => {
    let City_COORDINATES_URL = `${COUNTRY_URL}q=${city}&limit=1&appid=${API_KEY}`
    try {
        const response = await fetch(City_COORDINATES_URL, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getWeatherData = async (city) => {
    const data = await getCityData(city)

    let CITY_WEATHER_DATA_URL = `${WEATHER_URL}lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_KEY}`
    const weatherPromise =  fetch(CITY_WEATHER_DATA_URL, options)

    return weatherPromise.then(response =>{
        return response.json()
    })
}


const searchCity = async () => {
    const city = document.getElementById('city-input').value;
    const data = await getWeatherData(city)
    showWeatherData(data)
}

const convertFtoC = (temp) => {
    let c_temp = (temp - 32) * 5 / 9
    return Math.round(c_temp)
}

const showWeatherData = (jsonWeatherData) => {
    //CODE GOES HERE
    console.log(jsonWeatherData)

    let city_name_element = document.getElementById('city-name')
    let temp_element = document.getElementById('temp')
    let min_temp_element = document.getElementById('min-temp')
    let max_temp_element = document.getElementById('max-temp')
    let type = document.getElementById('weather-type')

    type.innerText = jsonWeatherData.weather[0].main
    city_name_element.innerText = jsonWeatherData.name
    temp_element.innerText = convertFtoC(jsonWeatherData.main.temp)
    min_temp_element.innerText = convertFtoC(jsonWeatherData.main.temp_min)
    max_temp_element.innerText = convertFtoC(jsonWeatherData.main.temp_max)

}




