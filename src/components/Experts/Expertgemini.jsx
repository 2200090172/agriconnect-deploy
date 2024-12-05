import React, { useState } from 'react';
import Expertlayout from './Expertlayout';
import './Expertgemini.css';
import axios from 'axios';

const Expertgemini = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  async function generateAnswer() {
    if (!inputText.trim()) return; // Prevent empty input

    const userMessage = { type: 'user', text: inputText };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCUreqOxwG7Snzc9Rd9pF7WnC6PDgL9jCE",
        method: "post",
        data: {
          contents: [{ parts: [{ text: inputText }] }],
        },
      });

      const botAnswer = response.data.candidates[0].content.parts[0].text;
      const botMessage = { type: 'bot', text: botAnswer };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setInputText('');
    }
  }

  return (
    <Expertlayout>
      <header className="expert-gemini-header">
        <div className="expert-gemini-overlay">
          <h1 color='#fff'>Gemini Assistance</h1>
          <br></br>
          <br></br>
          <br></br>
          <div className="chat-container">
            <div className="chat-window">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${message.type === 'user' ? 'user-bubble' : 'bot-bubble'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type your question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input"
              />
              <span onClick={generateAnswer} className="chat-send-button">
                Send
              </span>
            </div>
          </div>
        </div>
      </header>
    </Expertlayout>
  );
};

export default Expertgemini;
