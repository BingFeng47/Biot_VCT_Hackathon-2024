"use client";

import { Bot } from "lucide-react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useState } from "react";
import ChatTeam from "./ui/chat-team";
import ChatBot from "./chat-bot";

// Placeholder for the chat input
const placeholders = [
  "Build a team using only players from VCT International.",
  "Rebibe me Jett",
  "Assign roles to each player and explain why this composition would be effective in a competitive match",
  "Build a team with at least 2 players from an underrepresented group",
  "Build a team with players from 3+ regions",
];

const quickPrompt = [
  "Build a team using only players from VCT International",
  "Build a team with players from 3+ regions",
];

export function ChatInit() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponse] = useState<{ avatar: string; chat: string }[]>([]);
  const [error, setError] = useState("");
  const [showElements, setShowElements] = useState(true);

  // Function to fetch bot response
  const fetchBotResponse = async (chats: { avatar: string; chat: string }[]) => {
    if (!chats) return; // Early return if no prompt

    try {
      setLoading(true); // Set loading state
      const apiResponse = await fetch('http://localhost:8000/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chats }), // Send the correct structure
      });

      if (!apiResponse.ok) {
        console.error('Failed to fetch from API:', apiResponse.statusText);
        setError('Error fetching response from API.'); // User feedback
        setLoading(false); // Reset loading state
        return; // Exit if there's an error
      }

      // Handle the response as a stream
      const reader = apiResponse.body?.getReader(); // Optional chaining
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Failed to get reader from response body.');
      }

      // Read the response stream
      const processStream = async () => {
        let done = false;

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;

          // Decode the stream data
          if (value) {
            const text = decoder.decode(value, { stream: true });

            // Update the response character by character
            for (let char of text) {
              setResponse((prev) => {
                // If previous response is from the bot, update it
                if (prev.length > 0 && prev[prev.length - 1].avatar === 'bot') {
                  const lastResponse = prev[prev.length - 1];
                  const updatedResponse = { ...lastResponse, chat: lastResponse.chat + char };
                  return [...prev.slice(0, -1), updatedResponse];
                } else {
                  // Otherwise, add a new bot response
                  return [...prev, { avatar: 'bot', chat: char }];
                }
              });
              await new Promise(resolve => setTimeout(resolve, 10)); // Control typing speed (10 ms delay)
            }
          }
        }
        setLoading(false); // Reset loading state

      };

      processStream().catch((error) => {
        console.error('Stream processing error:', error);
        setError('Error processing stream.'); // User feedback
      });
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error occurred.');
      setLoading(false); // Reset loading state
      // User feedback
    }
  };

  const onSubmit = () => {
    if (!inputValue.trim()) return; // Prevent empty submissions

    // Append new chat to the list with the user avatar
    const userChat = { avatar: 'user', chat: inputValue };
    const updatedResponses = [...responses, userChat];
    setResponse(updatedResponses);

    fetchBotResponse(updatedResponses); // Send the updated responses to the bot
    setInputValue(''); // Clear input after submitting
    if (showElements) setShowElements(false); // Hide elements after first submission
  };

  return (
    <div className="h-screen flex flex-col items-center px-5">
      {showElements && (
        <div className="h-screen -mt-20 flex flex-col items-center justify-center">
          <h2 className={`mb-2 sm:mb-5 text-xl text-center sm:text-5xl text-accent-foreground transition-opacity duration-500 ${showElements ? 'opacity-100' : 'opacity-0'}`}>
            <Bot size={30} className="pb-1" /> Build Your Valorant Team
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={onSubmit}
          />
          <div className="flex flex-col mt-4">
            <div className="flex flex-row gap-2">
              {quickPrompt.map((prompt, index) => (
                <div key={index} className="bg-accent p-2 rounded-md cursor-pointer text-xs hover:bg-destructive hover:text-white"
                  onClick={() => {
                    setInputValue(prompt);
                    onSubmit() // Ensure onSubmit is called after inputValue is set
                  }}>
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="min-w-full">
        {!showElements && (
          <div className="px-10">
            <div className="flex flex-3 flex-row gap-8">
              <ChatBot loading={loading} response={responses} inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit} />
              <ChatTeam />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}