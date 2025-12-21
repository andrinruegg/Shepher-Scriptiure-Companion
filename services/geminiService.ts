import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Message, QuizQuestion } from "../types.ts";

// Strictly follow coding guidelines: Obtain API key exclusively from process.env.API_KEY
// and initialize the client instance directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_SYSTEM_INSTRUCTION = `
You are "Shepherd", a warm, friendly, and encouraging Scripture Companion.
Core Purpose: To guide users to the peace and wisdom found in the Bible.
Tone: Simple, warm, relatable, and encouraging.
Format: Use Markdown, blockquotes for verses, and bold references.
`;

const mapHistoryToContent = (messages: Message[]) => {
  return messages
    .filter((m) => !m.isError)
    .map((m) => ({
      role: m.role,
      parts: [{ text: m.text }], 
    }));
};

export const generateChatTitle = async (userMessage: string, language: string = 'English'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this user request into a short 3-5 word title in "${language}": "${userMessage}"`,
    });
    return response.text ? response.text.trim() : 'New Conversation';
  } catch (error) {
    return userMessage.slice(0, 30) + '...';
  }
};

export const sendMessageStream = async (
  history: Message[],
  newMessage: string,
  hiddenContext: string | undefined,
  bibleTranslation: string,
  language: string,
  displayName: string | undefined,
  onChunk: (text: string) => void,
  onComplete: () => void,
  onError: (error: any) => void
) => {
  try {
    const formattedHistory = mapHistoryToContent(history.slice(-10));
    const dynamicInstruction = `${BASE_SYSTEM_INSTRUCTION}
    1. QUOTE SCRIPTURE USING ${bibleTranslation}.
    2. RESPOND IN ${language || "English"}.
    ${displayName ? `3. Address the user as "${displayName}".` : ''}`;

    const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        history: formattedHistory,
        config: { systemInstruction: dynamicInstruction },
    });

    const promptToSend = hiddenContext ? `${newMessage}\n\n[Context: ${hiddenContext}]` : newMessage;
    const result = await chat.sendMessageStream({ message: promptToSend });

    for await (const chunk of result) {
        if (chunk.text) onChunk(chunk.text);
    }
    onComplete();
  } catch (error) {
    onError(error);
  }
};

export const generateSpeech = async (text: string, language: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
    });
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) throw new Error("No audio data returned");
    return audioData;
};

export const translateContent = async (text: string, targetLanguage: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following text to ${targetLanguage}. Return ONLY the translated text without commentary:\n\n"${text}"`
    });
    return response.text || text;
};

export const generateQuizQuestion = async (
    difficulty: 'Easy' | 'Medium' | 'Hard', 
    language: string
): Promise<QuizQuestion> => {
    const prompt = `Generate a unique multiple-choice Bible trivia question in ${language}. Difficulty: ${difficulty}. Return strictly JSON.`;
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    reference: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctIndex', 'explanation', 'reference']
            }
        }
    });
    return JSON.parse(response.text || "{}");
};

export const getBibleChapterFromAI = async (
    bookName: string, 
    chapter: number, 
    translation: string,
    language: string
): Promise<{ verse: number, text: string }[]> => {
    const prompt = `Provide the text for ${bookName} chapter ${chapter} in the ${translation} translation. Language: ${language}. Return as a JSON array of objects with 'verse' (number) and 'text' (string).`;
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        verse: { type: Type.INTEGER },
                        text: { type: Type.STRING }
                    },
                    required: ['verse', 'text']
                }
            }
        }
    });
    return JSON.parse(response.text || "[]");
};