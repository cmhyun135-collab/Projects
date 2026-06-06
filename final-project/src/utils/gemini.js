import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "dummy"); // Fallback to avoid crash on init if missing

export const analyzeEmotion = async (diaryContent) => {
  if (!apiKey) {
    throw new Error("Gemini API 키가 설정되지 않았습니다.");
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
다음 일기 내용을 분석하고 반드시 아래의 JSON 형식으로만 응답해주세요.

필수 필드:
- "emotion": 주된 감정을 나타내는 짧은 단어 (예: "기쁨", "슬픔", "분노", "평온", "불안", "신남").
- "score": 1부터 100 사이의 숫자. 감정의 긍정적인 정도 (1 = 매우 부정적, 100 = 매우 긍정적).
- "analysis": 일기 내용을 바탕으로 사용자가 왜 이런 감정을 느끼는지에 대한 1~2문장의 짧은 분석.
- "message": 다정한 AI 친구로서 사용자에게 건네는 따뜻하고 격려가 되는 2~3문장의 메시지.

일기 내용:
"${diaryContent}"
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("감정 분석에 실패했습니다. 다시 시도해주세요.");
  }
};
export const analyzeDiary = analyzeEmotion;
