import { GoogleGenAI, Type } from "@google/genai";
import { EventData } from "../types";

const parseEventDetails = async (rawText: string): Promise<EventData> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing, returning mock data");
    return {
      title: "Summer Tech Mixer",
      date: "August 24, 2024",
      time: "6:00 PM",
      location: "Rooftop 42, San Francisco",
      description: "Join us for an evening of networking and cocktails.",
      tone: "casual",
      hostName: "InviteFlow Team"
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract the event details from the following text. 
      If specific details are missing, infer reasonable placeholders or leave them generic.
      Text: "${rawText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            time: { type: Type.STRING },
            location: { type: Type.STRING },
            description: { type: Type.STRING },
            tone: { type: Type.STRING, enum: ['formal', 'casual', 'playful', 'tech'] },
            hostName: { type: Type.STRING },
          },
          required: ["title", "date", "time", "location", "description", "tone", "hostName"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as EventData;
  } catch (error) {
    console.error("Error parsing event:", error);
    // Fallback if parsing fails
    return {
      title: "New Event",
      date: "TBD",
      time: "TBD",
      location: "TBD",
      description: rawText.substring(0, 100),
      tone: "casual",
      hostName: "Host"
    };
  }
};

export { parseEventDetails };