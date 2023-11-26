import React, { useState, useEffect } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/index";

const ChatGPT = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesCollection = collection(firestore, "messages");
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleChat = async () => {
    try {
      const userDocRef = await addDoc(collection(firestore, "messages"), {
        prompt: input,
        timestamp: new Date(),
        type: "user",
      });

      // Wait for Firestore to trigger an update
      const responseDoc = await userDocRef.get();
      const responseContent = responseDoc.data()?.response;

      // Update local state with bot response
      setMessages([...messages, { type: "IAM ", response: responseContent }]);
    } catch (error) {
      console.error("Error handling chat:", error);
    }
  };

  return (
    <section className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6">
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
  {messages.map((msg, index) => (
    <div key={index} className={msg.type === "user" ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`${
          msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        } rounded-lg px-4 py-2 max-w-[80%]`}
      >
        {/* Display user input for user messages */}
        
        {msg.type === "user" && <p className="text-sm">{msg.prompt}</p>}

        {/* Display bot response for bot messages */}
        <p className="text-sm">{msg.response}</p>
      </div>
    </div>
  ))}
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
      </div>
    </section>
  );
};

export default ChatGPT;
