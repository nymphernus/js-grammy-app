const axios = require('axios');
const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;

async function getCityName(msg, loc = false) {
    const baseUrl = 'https://nominatim.openstreetmap.org';
    let url = loc === false
        ? `${baseUrl}/reverse?lat=${msg.location.latitude}&lon=${msg.location.longitude}&format=json`
        : `${baseUrl}/search?q=${encodeURIComponent(msg.text)}&format=json`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return loc === false ? data.address.city : data[0].name;
    } catch {
        console.error('Ошибка при получении названия города.', error);
        return "Произошла ошибка.";
    }
    
}

async function getWeatherData(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: weatherApiKey,
                units: 'metric' // Для получения температуры в Цельсиях
            }
        });
        return Math.round(response.data.main.temp); // Возвращаем температуру из полученных данных и округляем
    } catch (error) {
        console.error('Ошибка при получении температуры.', error);
        return "Произошла ошибка.";
    }
}

async function fetchWeather(ctx, loc = false) {
    ctx.session[loc ? 'waitingForLocation' : 'waitingForCity'] = false;

    try {
        const cityData = loc 
            ? await getCityName(ctx.message)
            : await getCityName(ctx.message, true);
        const tempData = await getWeatherData(cityData);
        await ctx.deleteMessage();

        if (!Number.isInteger(tempData)) throw new Error();

        return `Ваш город: ${cityData}\nТекущая температура: ${tempData}°C`;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        return "Произошла ошибка. Пожалуйста, попробуйте еще раз.";
    }
}

module.exports = {
    weatherService: {
        getWeatherData,
        getCityName,
        fetchWeather
    }
}