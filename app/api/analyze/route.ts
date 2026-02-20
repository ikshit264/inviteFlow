import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { rawText } = body;

    if (!rawText) {
        return NextResponse.json({ error: "Missing rawText" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({
            title: "Summer Tech Mixer",
            date: "August 24, 2024",
            time: "6:00 PM",
            location: "Rooftop 42, San Francisco",
            description: "Join us for an evening of networking and cocktails.",
            tone: "casual",
            hostName: "InviteFlow Team"
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    try {
        const prompt = `Extract the event details from the following text. 
      If specific details are missing, infer reasonable placeholders based on the context or leave them generic.
      Text: "${rawText}"
      
      Output strictly valid JSON with the following structure:
      {
        "title": "Short event title",
        "date": "Date string (e.g. August 24, 2024)",
        "time": "Time string (e.g. 6:00 PM)",
        "location": "Location string",
        "description": "Short description (max 2 sentences)",
        "tone": "formal" | "casual" | "playful" | "tech",
        "hostName": "Name of host"
      }`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        let text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Clean up markdown code blocks if present
        text = text.replace(/```json\n?|\n?```/g, "").trim();

        // Attempt to find the first '{' and last '}' to extract JSON
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            text = text.substring(firstBrace, lastBrace + 1);
        }

        try {
            const parsedData = JSON.parse(text);
            return NextResponse.json(parsedData);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Original text:", text);
            throw new Error("Failed to parse AI response into JSON");
        }
    } catch (error: any) {
        console.error("Error parsing event:", error);
        return NextResponse.json({
            title: "New Event",
            date: "TBD",
            time: "TBD",
            location: "TBD",
            description: rawText.substring(0, 100),
            tone: "casual",
            hostName: "Host"
        }, { status: 500 });
    }
}
