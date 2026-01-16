
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Initializing GoogleGenAI with named parameter and direct process.env.API_KEY usage
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async askQuestion(question: string, context?: string) {
    try {
      // Fix: Using gemini-3-pro-preview for advanced informatics and coding reasoning tasks
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: question,
        config: {
          systemInstruction: `Bạn là một chuyên gia hỗ trợ học tập môn Tin học lớp 10, bám sát bộ sách "Kết nối tri thức với cuộc sống". 
          Nhiệm vụ của bạn là giải thích các khái niệm về phần cứng, phần mềm, Internet, đạo đức số và đặc biệt là lập trình Python.
          Khi giải thích về Python, hãy cung cấp ví dụ code rõ ràng.
          Trả lời bằng tiếng Việt, ngôn ngữ sư phạm dễ hiểu, khích lệ học sinh.
          Ngữ cảnh bài học hiện tại: ${context || 'Kiến thức Tin học lớp 10 tổng quát'}`,
          temperature: 0.7,
        },
      });

      // Fix: Accessing .text property directly instead of method as per SDK guidelines
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Xin lỗi, mình gặp một chút trục trặc khi kết nối. Bạn hãy thử lại sau nhé!";
    }
  }
}

export const geminiService = new GeminiService();
