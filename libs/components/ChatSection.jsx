"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { personaPhotos } from "@/constant/index";
import toast from "react-hot-toast";

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [persona, setPersona] = useState("");
  const [loader, setLoader] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !persona) {
      toast.error('Please select a persona and enter a message.🥺');
      return
    }
    const userMessage = { text: newMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoader(true);
    try {
      const { text } = userMessage;
      const response = await axios.post(
        `/api/chat/${persona}`,
        { query: text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = JSON.parse(response?.data.result);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result.text, sender: persona },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoader(false);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendDataToPersona = (persona) => {
    setPersona(persona);
  };

  return (
    <>
      <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-2xl w-full max-w-4xl flex flex-col h-[90vh] shadow-2xl">
        <Navbar sendDataToPersona={sendDataToPersona} />

        <div className="flex-grow overflow-y-auto  p-4 custom-scrollbar pb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 mb-4 transition-all duration-300 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== "user" && (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
                  <img
                    src={
                      personaPhotos[message.sender] ||
                      personaPhotos["piyush-sir"]
                    }
                    alt={message.sender}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                    : "bg-zinc-700 text-gray-100 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                  <img
                    src={personaPhotos.user}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {loader && (
            <div className="bg-zinc-700/50 rounded-xl px-4 py-2 w-fit ml-12 animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex w-full items-center space-x-4 p-4 border-t border-zinc-600">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-grow p-4 rounded-xl bg-zinc-700 text-gray-100 placeholder-gray-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-none h-12 focus:h-24"
            rows={1}
            style={{ minHeight: "3rem", maxHeight: "10rem" }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Send
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* gray-800 */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280; /* gray-500 */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af; /* gray-400 */
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
}

export default ChatSection;
