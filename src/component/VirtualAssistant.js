import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Import your firebase configuration
import { firestore } from "../firebase";

const ChatGPT = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    try {
      // Custom logic to check user's input for specific keywords
      if (input.toLowerCase().includes("hello")) {
        setResponse("Hello! How can I help you today?");
      } else if (input.toLowerCase().includes("how are you")) {
        setResponse("I am just a virtual assistant, but thanks for asking!");
      } else {
        // If no specific keyword is detected, use the OpenAI API
        const openaiResponse = await fetchOpenAIResponse(input);
        setResponse(openaiResponse);
      }

      // Save conversation to Firestore
      await addDoc(collection(firestore, "message"), {
        input,
        response,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error handling chat:", error);
    }
  };

  const fetchOpenAIResponse = async (userInput) => {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: userInput,
      }),
    });

    if (!response.ok) {
      console.error("Failed to fetch data. Status:", response.status);
      const errorText = await response.text();
      console.error("Error message:", errorText);
      return "Oops! Something went wrong.";
    }

    const result = await response.json();
    return result.choices[0].text;
  };

  return (
    <section className="p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6">
      <div className="flex justify-center px-6 py-8 mx-auto xs:h-screen overflow-y-auto ">
        <div className="">
          <div>
            {/* Header */}
            <div className="flex items-center mb-4">
              <AiOutlineRobot size={30} className="mr-2" />
              <h2 className="text-xl font-bold">Virtual Assistant</h2>
            </div>

            <div className="block w-full pt-12">
              <div className="flex-grow overflow-y-auto">
                {/* Chat messages */}
                <div className="flex flex-col mb-4 gap-4 py-4">
                  {response && (
                    <div className="flex justify-end">
                      <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">{response}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex justify-center items-center h-16">
                  {/* Chat input */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                    placeholder="Type a message..."
                  />
                  <button
                    type="button"
                    onClick={handleChat}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatGPT;
