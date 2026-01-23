import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

function getSavedMessages() {
  try {
    const saved = localStorage.getItem('messages');
    if (!saved) return [];
    const messages = JSON.parse(saved);
    return messages.filter(msg => typeof msg.message === 'string');
  } catch (error) {
    console.error('Failed to load messages:', error);
    localStorage.removeItem('messages');
    return [];
  }
}

function App() {
  const [chatMessages, setChatMessages] = useState(getSavedMessages());
  // run only once
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a good day!',
      'hi': 'Hi! How is it going?',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    })
  });

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using text box below.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
