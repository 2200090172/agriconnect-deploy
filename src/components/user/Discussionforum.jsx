import React, { useState } from "react";
import Signinlayout from "../signin/Signinlayout";
import Userlayout from "./Userlayout";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi! It's great to see you. What can I help you with?";
    } else if (userMessage.toLowerCase().includes("services")) {
      return "We offer consulting, digital transformation, and IT services. Let me know if you'd like more details on any of these.";
    } else if (userMessage.toLowerCase().includes("career")) {
      return "Are you looking for career advice? I'd be happy to help with tips or resources.";
    } else if (userMessage.toLowerCase().includes("help")) {
      return "I'm here to help! You can ask about our offerings, careers, or general queries.";
    } else if (userMessage.trim() === "") {
      return "It seems you didn't type anything. How can I assist you?";
    } else {
      return `Interesting! Tell me more about "${userMessage}"—I'd love to help.`;
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = { sender: "bot", text: getAIResponse(input) };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);

    setInput("");
  };

  return (
    <Userlayout>
       <header className="user-header">
       <div className="user-overlay">
    <div style={styles.chatbotContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "" : "",
              backgroundColor: msg.sender === "user" ? "#007BFF" : "#f0f0f0",
              color: msg.sender === "user" ? "#fff" : "#333",
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: "flex-start", fontStyle: "italic", color: "#888" }}>
            AI is typing...
          </div>
        )}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button style={styles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
    </div>
        </header>
    </Userlayout>
  );
};

const styles = {
  chatbotContainer: {
    width: "500px",
    height: "650px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "20px auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  message: {
    maxWidth: "75%",
    padding: "12px",
    borderRadius: "15px",
    wordWrap: "break-word",
    fontSize: "1.1em",
    lineHeight: "1.4",
  },
  inputContainer: {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "60px", // Increased height for larger input field
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "1em",
    outline: "none",
    transition: "all 0.3s",
  },
  sendButton: {
    marginLeft: "15px",
    padding: "15px 25px", // Balanced with input height
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s ease",
  },
};

export default Chatbot;
