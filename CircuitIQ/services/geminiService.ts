import { Message } from "../types";

export class GeminiService {
  async sendMessage(
    agentInstruction: string,
    history: Message[],
    userInput: string
  ) {
    try {
      console.log('Sending to backend proxy at http://localhost:8000/api/chat');
      
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentInstruction,
          history,
          userInput
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        return "Error connecting to backend.";
      }
      
      const data = await response.json();
      return data.text || "Sorry, I couldn't generate a response.";
      
    } catch (error) {
      console.error("Error:", error);
      return "An error occurred while contacting the intelligence engine.";
    }
  }
}

export const geminiService = new GeminiService();