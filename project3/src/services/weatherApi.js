const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API 키가 설정되지 않았습니다.');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('도시를 찾을 수 없습니다.');
      }
      throw new Error('날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    throw error;
  }
};
