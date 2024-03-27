
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');


search.addEventListener('click', () => {
    //APIKeys from https://openweathermap.org/
    const APIKeys = 'c2293df5dee0e642c70876affff21852';
    const city = document.querySelector('.search-box input').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKeys}`).then(response => response.json()).then(json => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity .info-humidity');
        const wind = document.querySelector('.weather-details .wind .info-wind');
        const pressure = document.querySelector('.weather-details .pressure .info-pressure');

        if (json.cod == '404') {
            container.style.height = '555px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error.classList.remove('active');

        switch (json.weather[0].main) {
            case 'Clear':
            	image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/01d.svg'; 
            	break;
            case 'Rain':
            	image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/09.svg'; 
            	break;
           	case 'Sun':
           		image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/01d.svg'; 
            	break;
           	case 'Snow':
           		image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/49.svg'; 
            	break;
            case 'Clouds':
           		image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/04.svg'; 
            	break;
            case 'Mist':
            	image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/03d.svg'; 
            	break;
            case 'Haze':
            	image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/03d.svg'; 
            	break;
            case 'default' :
            	image.src = 'https://www.yr.no/assets/images/weather-symbols/light-mode/default/svg/02d.svg'; 
            	break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        pressure.innerHTML = `${json.main.pressure}hPa`;

    });

});