import { EventData } from "../types";

const parseEventDetails = async (rawText: string): Promise<EventData> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawText }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze event');
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling analyze API:", error);
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