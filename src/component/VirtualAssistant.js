import React, { useState, useEffect } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/index";
import { useAuth } from "../context/AuthContext";

const ChatGPT = () => {
  const { currentUser } = useAuth();
  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [iamResponses, setIAMResponses] = useState([]);

  useEffect(() => {
    // Clear displayed messages when the component mounts
    setDisplayedMessages([]);
    
    const fetchInitialMessages = async () => {
      try {
        const messagesCollection = collection(firestore, "messages");
        const snapshot = await getDocs(messagesCollection);

        const allMessages = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setAllMessages(allMessages);
        
        // Display all IAM messages when the component mounts
        setDisplayedMessages(allMessages.filter((msg) => msg.type === "IAM"));
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };

    if (currentUser) {
      fetchInitialMessages();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !currentUser.uid) return;

    const messagesCollection = collection(firestore, "messages");
    const unsubscribe = onSnapshot(messagesCollection, (querySnapshot) => {
      const updatedMessages = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.timestamp - b.timestamp);

      setAllMessages(updatedMessages);

      // Only update displayed messages if they are not user messages
      setDisplayedMessages(updatedMessages.filter((msg) => msg.type === "IAM"));
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleChat = async () => {
    try {
      if (!currentUser || !currentUser.uid) {
        console.error("User information is not available.");
        return;
      }

      const userDocRef = await addDoc(collection(firestore, "messages"), {
        userId: currentUser.uid,
        prompt: input,
        timestamp: new Date(),
        type: "user",
      });

      const updatedUserDocRef = doc(firestore, "messages", userDocRef.id);

      setAllMessages((prevMessages) => [
        ...prevMessages,
        { id: userDocRef.id, type: "user", prompt: input },
      ]);

      onSnapshot(updatedUserDocRef, (responseDoc) => {
        const responseContent = responseDoc.data()?.response;

        setAllMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === userDocRef.id
              ? { ...message, type: "IAM", response: responseContent }
              : message
          )
        );

        // Display the user's own message temporarily
        setDisplayedMessages((prevMessages) =>
          prevMessages.concat({ id: userDocRef.id, type: "user", prompt: input }, { id: userDocRef.id, type: "IAM", response: responseContent })
        );
      });
    } catch (error) {
      console.error("Error handling chat:", error);
    }
  };

  return (
    <section className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 max-h-[550px]">
      <div className="flex justify-center px-6 py-8 mx-auto xs:h-screen overflow-y-auto">
        <div className=" w-full">
          <div>
            {/* Header */}
            <div className="flex items-center mb-4">
              <AiOutlineRobot size={30} className="mr-2" />
              <h2 className="text-xl font-bold">Virtual Assistant</h2>
            </div>

            <div className="block w-full pt-12">
              <div className="flex-grow overflow-y-auto">
                {/* Chat messages */}
                <div className="flex flex-col mb-4 gap-4 py-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {displayedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.type === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={`${
                          msg.type === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-black"
                        } rounded-lg px-4 py-2 max-w-[80%]`}
                      >
                        {/* Display user input for user messages */}
                        {msg.type === "user" && (
                          <p className="text-sm">{msg.prompt}</p>
                        )}
                        {/* Display bot response for bot messages */}
                        {msg.type === "IAM" && (
                          <p className="text-sm">{msg.response}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                          
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex justify-center items-center">
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
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
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