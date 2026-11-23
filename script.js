const btn = document.querySelector('button');
const select = document.querySelector('select');
const City = document.querySelector('#city');
const temp = document.querySelector('#temp');
const main = document.querySelector('#main');
const Humidity = document.querySelector('#humidity');
const feelsLike = document.querySelector('#feels-like');
const windspeed = document.querySelector('#speed');
const icon = document.querySelector('#icon');

async function getWeatherData(city) {
    city = city.split(' ').join('+');
    console.log(city);
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();
    return data
}

async function updateWeather(city = 'Mumbai') {
    console.log(city);
    const data = await getWeatherData(city);
    const { temp_C, humidity, windspeedKmph, weatherIconUrl, weatherDesc, FeelsLikeC
    } = data.current_condition[0];
    City.textContent = city.toLocaleUpperCase();
    temp.textContent = `${temp_C}°C`;
    Humidity.textContent = `${humidity}%`;
    windspeed.textContent = `${windspeedKmph} km/h`;
    icon.src = weatherIconUrl[0].value;
    main.textContent = weatherDesc[0].value;
    feelsLike.textContent = `${FeelsLikeC}°C`;
}

updateWeather();

btn.addEventListener('click', () => {
    try {
        btn.disabled = true;
        const city = select.value;
        updateWeather(city);
    }
    catch (err) {
        console.error('Error fetching weather data:', err);
    }
    finally {
        btn.disabled = false;
    }
});


