import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const CUSTOMERID = 'cus_01J27FYAKGMXNCSFM6JFH93X03'


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [chatId, setChatId] = useState('')

  // Fetch messages from backend when component mounts
  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    try {
      // [TODO] Per determinar com recuperar customId per cada usuari
      

      const response = await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: 'Chat initialized' }),
      }).then(response => response.json())
      .then(data => setChatId(data.chat.id));
  
    } catch (error) {
      console.error('Error initializing chat :', error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      try {
        // [TODO] Per determinar quin es el endpoint dels missatges
        const response = await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/${chatId}/new_message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input}),
        });

        const newMessage = await response.json();
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
