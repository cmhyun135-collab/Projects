import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateWeatherMessage = async (weatherData) => {
  if (!API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.');
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `현재 도시: ${weatherData.city}
현재 온도: ${weatherData.temperature}°C
날씨 상태: ${weatherData.condition}
습도: ${weatherData.humidity}%
풍속: ${weatherData.windSpeed}m/s

위 날씨 정보를 바탕으로 사용자에게 기분 좋은 하루를 보낼 수 있도록 "오늘 날씨에 어울리는 짧고 감성적인 한마디"를 작성해주세요. (예: 따뜻한 커피 한 잔과 함께 여유를 즐겨보세요! ☕)
답변은 다른 군더더기 없이 딱 한마디 문장만 출력해주세요.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('한마디를 생성하는 중 오류가 발생했습니다.');
  }
};
