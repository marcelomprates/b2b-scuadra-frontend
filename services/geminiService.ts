import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if the key exists to prevent immediate crashes in demo mode
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeSystemLogs = async (logs: string): Promise<string> => {
  if (!ai) return "API Key not configured. Please set process.env.API_KEY.";

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(
      `You are a DevOps expert for B2B Scuadra. Analyze the following system log snippet or status and provide a brief, professional recommendation for the engineering team. Keep it under 50 words. Logs: ${logs}`
    );
    const response = result.response;
    return response.text() || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI analysis service.";
  }
};

export const getSalesInsights = async (salesData: any): Promise<string> => {
    if (!ai) return "API Key not configured. Please set process.env.API_KEY.";
  
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      const result = await model.generateContent(
        `You are a B2B Sales Analyst. Analyze this JSON sales data and give 2 key strategic insights for the sales manager. Data: ${JSON.stringify(salesData)}`
      );
      const response = result.response;
      return response.text() || "No insights available.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate sales insights at this time.";
    }
  };