import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const systemInstruction = `당신은 고도로 숙련된 전문 여행 가이드이자 플래너입니다. 
주어진 여행 취향(계절, 분위기, 예산, 동행 인원)을 바탕으로, 정확히 3곳의 특별하고 멋진 여행지를 추천해야 합니다.
반드시 엄격한 JSON 형식으로만 응답해야 합니다. JSON은 정확히 3개의 객체를 포함하는 배열이어야 합니다.
각 객체는 다음 키를 가져야 합니다:
- "name": (문자열) 여행지 이름.
- "reason": (문자열) 사용자의 취향을 바탕으로 이 여행지를 추천하는 상세한 이유.
- "cost": (문자열) 예상 비용 또는 예산 범주 (예: "약 100만원", "가성비 좋음", "럭셔리").
JSON 배열 외부에는 어떠한 텍스트나 마크다운 블록도 포함하지 마세요.`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export const getTravelRecommendations = async (preferences) => {
  try {
    const prompt = `다음 취향을 바탕으로 3곳의 여행지를 추천해주세요:
계절: ${preferences.season}
분위기: ${preferences.vibe}
예산: ${preferences.budget}
동행 인원: ${preferences.companions}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the JSON array
    const destinations = JSON.parse(text);
    return destinations;
  } catch (error) {
    console.error("여행지 추천을 가져오는 중 오류 발생:", error);
    throw new Error("여행지 추천을 가져오지 못했습니다. 다시 시도해주세요.");
  }
};

export const startTravelChat = () => {
  return model.startChat({
    history: [],
  });
};

export const getNextTravelRecommendations = async (chatSession, preferences) => {
  try {
    const prompt = preferences
      ? `다음 취향을 바탕으로 이전과 다른 새로운 여행지 3곳을 추천해주세요: 계절: ${preferences.season}, 분위기: ${preferences.vibe}, 예산: ${preferences.budget}, 동행 인원: ${preferences.companions}. 방금 추천한 곳은 제외해주세요.`
      : "방금 추천해준 곳들과 다른 새로운 여행지 3곳을 추천해주세요. 취향 조건은 동일하게 유지해주세요.";

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("채팅 생성 중 오류 발생:", error);
    throw new Error("새로운 추천을 가져오지 못했습니다. 다시 시도해주세요.");
  }
};
